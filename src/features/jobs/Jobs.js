import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectJobById } from './jobsApiSlice'

const Job = ({ jobId }) => {
    const job = useSelector(state => selectJobById(state, jobId)) //check for connection between user and notes from example

    const navigate = useNavigate()

    if (job) {
        const handleEdit = () => navigate(`/dash/jobs/${jobId}`)

        const jobSkillString = job.skills.toString().replaceAll(',', ', ')

        // const cellStatus = job.active ? '' : 'table__cell--inactive'
        
        // This whole document is more for the jobs page with it skills array since users here do not have array for jobs
        return (
            <tr className="table__row job">
                {/* <td className="table__cell note__title">{job.title}</td>
                <td className={`table__cell ${cellStatus}`}>{jobSkillString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td> */}
                <td className="table__cell job__username">{job.username}</td>
                <td className="table__cell job__title">{job.title}</td>
                <td className="table__cell job__company">{job.company}</td>
                <td className="table__cell job__description">{job.description}</td>
                <td className="table__cell job__location">{job.location}</td>
                <td className="table__cell job__deadline">{job.deadline}</td>
                <td className="table__cell job__skills">{jobSkillString}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Job