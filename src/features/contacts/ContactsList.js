import { useGetContactsQuery } from "./contactsApiSlice";
import Contact from './Contact'

const ContactsList = () => {
    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = contacts

        const tableContent = ids?.length
            ? ids.map(contactId => <Contact key={contactId} userId={contactId} />)
            : null

        content = (
            <table className="table table--contacts">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th contact__username">Username</th>
                        <th scope="col" className="table__th contact__email">Email</th>
                        <th scope="col" className="table__th contact__phone">Phone</th>
                        <th scope="col" className="table__th contact__linkedin">LinkedIn</th>
                        {/* <th scope="col" className="table__th user__jobs">Jobs</th> */}
                        <th scope="col" className="table__th user__edit">Edit</th>
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

export default ContactsList