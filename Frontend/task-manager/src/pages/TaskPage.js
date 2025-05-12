import React, { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  deleteTask,
  searchTasks,
} from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !dueDate || !status) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      await createTask({
        taskTitle: title,
        taskDescription: description,
        taskDueDate: dueDate,
        taskStatus: status,
        createdBy: "User1",
        updatedBy: "User1",
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      loadTasks();
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleSearch = async () => {
    if (search.trim() === "") return loadTasks();
    const res = await searchTasks(search);
    setTasks(res.data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

      <TaskForm
        title={title}
        description={description}
        dueDate={dueDate}
        status={status}
        setTitle={setTitle}
        setDescription={setDescription}
        setDueDate={setDueDate}
        g
        setStatus={setStatus}
        handleSubmit={handleSubmit}
      />

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
