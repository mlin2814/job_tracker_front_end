import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Job Internship Search Page!</span></h1>
            </header>
            <main className="public__main">
                <p>Helping you keep track of your jobs/internships in search of the next best thing.</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public