import { useState, useEffect } from "react"
// import { useAddNewUserMutation } from "./usersApiSlice"
import { useAddNewContactMutation } from "./contactsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
// import { ROLES } from "../../config/roles"
// import { SKILLS } from "../../config/skills";

// const USER_REGEX = /^[A-z]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewContactForm = () => {

    const [addNewContact, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewContactMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [linkedin, setLinkedin] = useState('')

    // useEffect(() => {
    //     setValidUsername(USER_REGEX.test(username))
    // }, [username])

    // useEffect(() => {
    //     setValidPassword(PWD_REGEX.test(password))
    // }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setEmail('')
            setPhone('')
            setLinkedin('')
            navigate('/dash/contacts')
        }
    }, [isSuccess, navigate])

    // const onUsernameChanged = e => setUsername(e.target.value)
    // const onPasswordChanged = e => setPassword(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPhoneChanged = e => setPhone(e.target.value)
    const onLinkedinChanged = e => setLinkedin(e.target.value)

    const canSave = [username, email, phone, linkedin].every(Boolean) && !isLoading

    const onSaveContactClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewContact({ username, email, phone, linkedin })
        }
    }

    // const options = Object.values(SKILLS).map(skills => {
    //     return (
    //         <option
    //             key={skills}
    //             value={skills}
    //         > {skills}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUsernameClass = !username ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''
    const validLinkedinClass = !linkedin ? "form__input--incomplete" : ''
    

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveContactClicked}>
                <div className="form__title-row">
                    <h2>New Contact</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUsernameClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="contact-company">
                    Email:</label>
                <input
                    className={`form__input ${validEmailClass}`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="contact-description">
                    Phone:</label>
                <input
                    className={`form__input ${validPhoneClass}`}
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={onPhoneChanged}
                />

                <label className="form__label" htmlFor="contact-location">
                    LinkedIn:</label>
                <input
                    className={`form__input ${validLinkedinClass}`}
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
export default NewContactForm