// const EditContactForm = () => {
//     return (
//         <div>EditContactForm</div>
//     )
// }

// export default EditContactForm

// const NewcontactForm = () => {
//     return (
//         <div>NewcontactForm</div>
//     )
// }

// export default NewcontactForm

import { useState, useEffect } from "react"
import { useUpdateContactMutation, useDeleteContactMutation } from "./contactsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditContactForm = ({ contact, users }) => {

    const [updateContact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateContactMutation()

    const [deleteContact, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteContactMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(contact.username)
    const [email, setEmail] = useState(contact.email)
    const [phone, setPhone] = useState(contact.phone)
    const [linkedin, setLinkedin] = useState(contact.linkedin)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setUsername('')
            setEmail('')
            setPhone('')
            setLinkedin('')
            navigate('/dash/contacts')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onLinkedinChanged = e => setLinkedin(e.target.value)

    const canSave = [username, email, phone, linkedin].every(Boolean) && !isLoading

    const onSaveContactClicked = async (e) => {
        if (canSave) {
            await updateContact({ id: contact.id, username, email, phone, linkedin })
        }
    }

    const onDeleteContactClicked = async () => {
        await deleteContact({ id: contact.id })
    }


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUsernameClass = !username ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validLinkedinClass = !linkedin ? "form__input--incomplete" : ''
    
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Contact: {contact.username}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveContactClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteContactClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="contact-title">
                    Title:</label>
                <input
                    className={`form__input ${validUsernameClass}`}
                    id="username"
                    name="username"
                    // type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="contact-company">
                    Email:</label>
                <textarea
                    className={`form__input form__input--text ${validEmailClass}`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="contact-description">
                    Phone:</label>
                <textarea
                    className={`form__input form__input--text ${validPhoneClass}`}
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="contact-location">
                    Linkedin:</label>
                <textarea
                    className={`form__input form__input--text ${validLinkedinClass}`}
                    id="linkedin"
                    name="linkedin"
                    value={linkedin}
                    onChange={onLinkedinChanged}
                />
            </form>
        </>
    )

    return content
}

export default EditContactForm