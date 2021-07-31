import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();

        if (!text || !day) {
            return alert('Please enter task and day!');
        }
        const task = { text, day, reminder }

        onAdd(task);
        setText('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={submitForm}>
            <div className="form-control">
                <label htmlFor="task">Task</label>
                <input type="text" id="task" placeholder="Add task" value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="day">Day & Time</label>
                <input type="text" id="day" placeholder="Day & Time" value={day}
                    onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="remind">Set Reminder</label>
                <input type="checkbox" id="remind" checked={reminder} onChange={(e) => setReminder(e.target.checked)} />
            </div>
            <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
    )
}

export default AddTask;
