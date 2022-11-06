import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const jobsAdapter = createEntityAdapter({})

const initialState = jobsAdapter.getInitialState()

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJobs: builder.query({
            query: () => '/jobs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedJobs = responseData.map(job => {
                    job.id = job._id
                    return job
                });
                return jobsAdapter.setAll(initialState, loadedJobs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Job', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Job', id }))
                    ]
                } else return [{ type: 'Job', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetJobsQuery,
} = jobsApiSlice

// returns the query result object
export const selectJobsResult = jobsApiSlice.endpoints.getJobs.select()

// creates memoized selector
const selectJobsData = createSelector(
    selectJobsResult,
    jobsResult => jobsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllJobs,
    selectById: selectJobById,
    selectIds: selectJobIds
    // Pass in a selector that returns the jobs slice of state
} = jobsAdapter.getSelectors(state => selectJobsData(state) ?? initialState)