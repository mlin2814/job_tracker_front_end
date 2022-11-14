import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewContactForm from './NewContactForm'

const NewContact = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewContactForm users={users} />
    // const content = users ? <NewContactForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewContact

// const NewContact = () => {
//     return (
//         <div>NewContact</div>
//     )
// }

// export default NewContact