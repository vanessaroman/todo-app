const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = new Task({ text });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update task completion status
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
