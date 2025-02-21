import React from 'react';

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id, !task.completed)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} className="ml-2">
          {task.text}
        </span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
