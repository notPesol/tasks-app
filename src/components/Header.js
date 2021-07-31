import PropTypes from 'prop-types'
import Button from './Button'

function Header({ title, onToggle, showAdd }) {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button onClick={onToggle} color={showAdd ? 'red' : 'steelblue'} text={showAdd ? 'Close' : 'Open'} />
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

