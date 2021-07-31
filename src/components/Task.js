import { FaTimes } from 'react-icons/fa';

function Task({ task, onDelete, onToggle }) {
    return (
        <div onDoubleClick={() => onToggle(task.id)}
            className={`task ${task.reminder ? 'reminder' : ''}`}>
            <h3>{task.text}
                <FaTimes style={iconStyle} onClick={() => onDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

const iconStyle = {
    color: 'red',
    cursor: 'pointer'
};

export default Task

