import React from "react";

function TaskItem({ task, onDelete }) {
  return (
    <li className="border p-3 mb-2 rounded shadow">
      <h3 className="font-semibold">{task.taskTitle}</h3>
      <p>{task.taskDescription}</p>
      <p className="text-sm text-gray-500">Status: {task.taskStatus}</p>
      <button onClick={() => onDelete(task.id)} className="text-red-600 text-sm mt-2">
        Delete
      </button>
    </li>
  );
}

export default TaskItem;