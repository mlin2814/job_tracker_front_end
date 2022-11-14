// const NewJobForm = () => {
//     return (
//         <div>NewJobForm</div>
//     )
// }

// export default NewJobForm

import { useState, useEffect } from "react"
import { useUpdateJobMutation, useDeleteJobMutation } from "./jobsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditJobForm = ({ job, users }) => {

    const [updateJob, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateJobMutation()

    const [deleteJob, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteJobMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(job.title)
    const [company, setCompany] = useState(job.company)
    const [description, setDescription] = useState(job.description)
    const [location, setLocation] = useState(job.location)
    const [deadline, setDeadline] = useState(job.deadline)
    const [skills, setSkills] = useState(job.skills)
    const [userId, setUserId] = useState(job.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setCompany('')
            setDescription('')
            setLocation('')
            setDeadline('')
            setSkills([])
            navigate('/dash/jobs')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onCompanyChanged = e => setCompany(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onLocationChanged = e => setLocation(e.target.value)
    const onDeadlineChanged = e => setDeadline(e.target.value)

    const onSkillsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setSkills(values)
    }
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, company, description, location, deadline, skills.length, userId].every(Boolean) && !isLoading

    const onSaveJobClicked = async (e) => {
        if (canSave) {
            await updateJob({ id: job.id, user: userId, title, company, description, location, deadline, skills })
        }
    }

    const onDeleteJobClicked = async () => {
        await deleteJob({ id: job.id })
    }

    
    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Job #{job.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveJobClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteJobClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="job-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="job-title"
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
                    id="job-company"
                    name="company"
                    value={company}
                    onChange={onCompanyChanged}
                />

                <label className="form__label" htmlFor="job-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="job-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label" htmlFor="job-location">
                    Location:</label>
                <textarea
                    className={`form__input form__input--text ${validLocationClass}`}
                    id="job-location"
                    name="location"
                    value={location}
                    onChange={onLocationChanged}
                />

                <label className="form__label" htmlFor="job-deadline">
                    Deadline:</label>
                <textarea
                    className={`form__input form__input--text ${validDeadlineClass}`}
                    id="job-deadline"
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
                    multiple={true}
                    size="3"
                    value={skills}
                    onChange={onSkillsChanged}
                >
                    {options}
                </select>
                {/* <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="job-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="job-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="job-username">
                            ASSIGNED TO:</label>
                        <select
                            id="job-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div> */}
            </form>
        </>
    )

    return content
}

export default EditJobForm