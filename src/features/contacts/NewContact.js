import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewJobForm from './NewJobForm'

const NewJob = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewJobForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewJob

// const NewContact = () => {
//     return (
//         <div>NewContact</div>
//     )
// }

// export default NewContact