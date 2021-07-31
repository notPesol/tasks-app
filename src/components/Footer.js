import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
