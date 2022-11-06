import { useGetJobsQuery } from "./jobsApiSlice";
import Job from "./Jobs"

const JobsList = () => {
    const {
        data: job,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetJobsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = job

        const tableContent = ids?.length
            ? ids.map(jobId => <Job key={jobId} jobId={jobId} />)
            : null

        content = (
            <table className="table table--jobs">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th job__status">Username</th>
                        <th scope="col" className="table__th job__title">Title</th>
                        <th scope="col" className="table__th job__company">Company</th>
                        <th scope="col" className="table__th job__description">Description</th>
                        <th scope="col" className="table__th job__location">Location</th>
                        <th scope="col" className="table__th job__deadline">Deadline</th>
                        <th scope="col" className="table__th job__skills">Skills</th>
                        <th scope="col" className="table__th job__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}

export default JobsList