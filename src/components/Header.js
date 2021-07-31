import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation}  from 'react-router-dom'
function Header({ title, onToggle, showAdd }) {
    const location = useLocation();
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button onClick={onToggle} color={showAdd ? 'red' : 'steelblue'} text={showAdd ? 'Close' : 'Open'} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string
}


export default Header

