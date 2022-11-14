// import { Link } from "react-router-dom";

// const DashHeader = () => {
//     const content = (
//         <header className="dash-header">
//             <div className="dash-header__container">
//                 <Link to="/dash">
//                     <h1 className="dash-header__title">jobs</h1>
//                 </Link>
//                 <nav className="dash-header__nav">
//                     {/* add nav buttons later */}
//                 </nav>
//             </div>
//         </header>
//     )

//     return content
// }

// export default DashHeader

import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const JOBS_REGEX = /^\/dash\/jobs(\/)?$/
const CONTACTS_REGEX = /^\/dash\/contacts(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !JOBS_REGEX.test(pathname) && !CONTACTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">Jobs</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add more buttons later */}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader