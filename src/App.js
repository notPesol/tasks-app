import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const datas = await fetchTasks();
      setTasks(datas);
    }
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    return tasks;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const task = await res.json();
    return task;
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = new Date().getTime();
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',

    });
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();
    setTasks(tasks.map(task => (
      task.id === id ? { ...task, reminder: data.reminder } : task
    )));
  }

  // Toggle show addTask Form
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <Router>
      <div className="container">
        <Header onToggle={toggleAddTask} showAdd={showAddTask} />

        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No task to show'}
          </>
        )} />
        <Route path="/about" exact component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
