import { useState, useEffect } from 'react'
import './App.css'
import AddTask from './components/AddTask';

import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getDataFromServer = async () =>{
      const datas = await fetchTasks();
      setTasks(datas);
    }

    getDataFromServer();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    return tasks;
  }

  // Add task
  const addTask = async (task) => {
    // const id = new Date().getTime();
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',

    });
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = !task.reminder;
      }
      return task;
    }));
  }

  // Toggle show addTask Form
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      <Header onToggle={toggleAddTask} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No task to show'}
    </div>
  );
}

export default App;
