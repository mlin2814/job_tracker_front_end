import { store } from '../../app/store';
import { jobsApiSlice } from '../jobs/jobsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { contactsApiSlice } from "../contacts/contactsApiSlice";
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const jobs = store.dispatch(jobsApiSlice.endpoints.getJobs.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const contacts = store.dispatch(contactsApiSlice.endpoints.getContacts.initiate())

        return () => {
            console.log('unsubscribing')
            jobs.unsubscribe()
            users.unsubscribe()
            contacts.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
