const db = require("../models");
const Task = db.Task;
const validateStatus = require("../utils/validateStatus");

exports.createTask = async (req, res) => {
  try {
    if (!validateStatus(req.body.taskStatus)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    if (req.body.taskStatus && !validateStatus(req.body.taskStatus)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ error: "Task not found" });

    const updatedTask = await Task.findByPk(req.params.id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchTasks = async (req, res) => {
  try {
    const q = req.query.q;
    const tasks = await Task.findAll({
      where: {
        taskTitle: { [db.Sequelize.Op.like]: `%${q}%` },
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};