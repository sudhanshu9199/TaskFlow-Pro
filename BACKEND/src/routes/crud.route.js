const express = require('express');
const taskController = require('../controller/task.controller.js');
const router = express.Router();

// Create a new task
router.post('/', taskController.createTask);
router.get('/', taskController.allTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;