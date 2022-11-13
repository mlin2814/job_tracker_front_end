import { Link } from "react-router-dom";

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/jobs">View jobs</Link></p>
            <p><Link to="/dash/jobs/new">Add new job</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>
            <p><Link to="/dash/users/new">Add New User</Link></p>
            
            <p><Link to="/dash/contacts">View Contacts</Link></p>
            <p><Link to="/dash/contacts/new">Add New Contact</Link></p>

        </section>
    )

    return content
}

export default Welcome