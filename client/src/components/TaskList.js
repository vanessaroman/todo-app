import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = async (text) => {
    const newTask = { text };
    const result = await axios.post('http://localhost:5000/tasks', newTask);
    setTasks([...tasks, result.data]);
  };

  const toggleComplete = async (id, completed) => {
    const updatedTask = await axios.put(`http://localhost:5000/tasks/${id}`, { completed });
    setTasks(tasks.map(task => (task._id === id ? updatedTask.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
      <ul className="list-group">
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
