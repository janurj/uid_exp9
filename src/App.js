import React, { useState } from 'react';
import './App.css';

const App = () => {
  // State to manage the list of tasks and the current input
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Edit a task
  const editTask = (taskToEdit) => {
    setIsEditing(true);
    setCurrentTaskId(taskToEdit.id);
    setTask(taskToEdit.text);
  };

  // Update task after editing
  const updateTask = () => {
    setTasks(tasks.map(task =>
      task.id === currentTaskId ? { ...task, text: task } : task
    ));
    setTask('');
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(task.id)}>
              {task.text}
            </span>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
