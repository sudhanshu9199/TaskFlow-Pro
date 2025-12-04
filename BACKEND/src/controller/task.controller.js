const taskModel = require("../models/taskModel.js");

async function createTask(req, res) {
  try {
    const newTask = new taskModel({
      title: req.body.title,
      desc: req.body.desc,
      status: req.body.status || "TODO",
      userId: req.user._id,
    });
    const saveTask = await newTask.save();
    res.status(201).json({
        message: 'Task created successfully',
        task: saveTask
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

async function allTasks(req, res) {
  try {
    const tasks = await taskModel.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const updated = await taskModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({
        message: "Task not found",
      });
    res.json({
        message: "Task updated",
        updated
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await taskModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json({
      message: "Task deleted!",
      deleted,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createTask, allTasks, getTaskById, updateTask, deleteTask };