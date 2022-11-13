import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectContactById } from './contactsApiSlice'

const Contact = ({ contactId }) => {
    const contact = useSelector(state => selectContactById(state, contactId))

    const navigate = useNavigate()

    if (contact) {
        const handleEdit = () => navigate(`/dash/contacts/${contactId}`)

        return (
            <tr className="table__row contact">
                <td className="table__cell contact__username">{contact.username}</td>
                <td className="table__cell contact__email">{contact.email}</td>
                <td className="table__cell contact__phone">{contact.phone}</td>
                <td className="table__cell contact__linkedin">{contact.linkedin}</td>
                
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
export default Contact