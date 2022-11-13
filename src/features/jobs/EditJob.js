import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectJobById } from './jobsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditJobForm from './EditJobForm'

const EditJob = () => {
    const { id } = useParams()

    const job = useSelector(state => selectJobById(state, id))
    const users = useSelector(selectAllUsers)

    const content = job && users ? <EditJobForm job={job} users={users} /> : <p>Loading...</p>

    return content
}
export default EditJob