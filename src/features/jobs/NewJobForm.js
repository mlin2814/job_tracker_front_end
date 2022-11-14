import { useState, useEffect } from "react"
// import { useAddNewUserMutation } from "./usersApiSlice"
import { useAddNewJobMutation } from "./jobsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
// import { ROLES } from "../../config/roles"
import { SKILLS } from "../../config/skills";

// const USER_REGEX = /^[A-z]{3,20}$/
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewJobForm = () => {

    const [addNewJob, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewJobMutation()

    const navigate = useNavigate()

    // const [username, setUsername] = useState('')
    // const [validUsername, setValidUsername] = useState(false)
    // const [password, setPassword] = useState('')
    // const [validPassword, setValidPassword] = useState(false)
    // const [roles, setRoles] = useState("Job")
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [deadline, setDeadline] = useState('')
    const [skills, setSkills] = useState("Python")

    // useEffect(() => {
    //     setValidUsername(USER_REGEX.test(username))
    // }, [username])

    // useEffect(() => {
    //     setValidPassword(PWD_REGEX.test(password))
    // }, [password])

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setCompany('')
            setDescription('')
            setLocation('')
            setDeadline('')
            setSkills([])
            navigate('/dash/jobs')
        }
    }, [isSuccess, navigate])

    // const onUsernameChanged = e => setUsername(e.target.value)
    // const onPasswordChanged = e => setPassword(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onCompanyChanged = e => setCompany(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onLocationChanged = e => setLocation(e.target.value)
    const onDeadlineChanged = e => setDeadline(e.target.value)

    const onSkillsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setSkills(values)
    }

    const canSave = [skills.length, title, company, description, location, deadline].every(Boolean) && !isLoading

    const onSaveJobClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewJob({ title, company, description, location, deadline, skills })
        }
    }

    const options = Object.values(SKILLS).map(skills => {
        return (
            <option
                key={skills}
                value={skills}
            > {skills}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validCompanyClass = !company ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validLocationClass = !location ? "form__input--incomplete" : ''
    const validDeadlineClass = !deadline ? "form__input--incomplete" : ''
    const validSkillsClass = !Boolean(skills.length) ? "form__input--incomplete" : ''
    // const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    // const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    // const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveJobClicked}>
                <div className="form__title-row">
                    <h2>New Job</h2>
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
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="job-company">
                    Company:</label>
                <textarea
                    className={`form__input form__input--text ${validCompanyClass}`}
                    id="company"
                    name="company"
                    value={company}
                    onChange={onCompanyChanged}
                />

                <label className="form__label" htmlFor="job-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label" htmlFor="job-location">
                    Location:</label>
                <textarea
                    className={`form__input form__input--text ${validLocationClass}`}
                    id="location"
                    name="location"
                    value={location}
                    onChange={onLocationChanged}
                />

                <label className="form__label" htmlFor="job-deadline">
                    Deadline:</label>
                <textarea
                    className={`form__input form__input--text ${validDeadlineClass}`}
                    id="deadline"
                    name="deadline"
                    value={deadline}
                    onChange={onDeadlineChanged}
                />

                <label className="form__label" htmlFor="skills">
                    ASSIGNED SKILLS:</label>
                <select
                    id="skills"
                    name="skills"
                    className={`form__select ${validSkillsClass}`}
                    multiple={false}
                    size="2"
                    value={skills}
                    onChange={onSkillsChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default NewJobForm