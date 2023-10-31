const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.route('/add').post(taskController.addTask);
router.route('/tasks').get(taskController.getAllTasks);
router.route('/edit/:id').put(taskController.editTask); // Update this route if you need to edit tasks with a deadline.

router
	.route('/:id')
	.put(taskController.statusChange) // Update this route if you need to update the task status and deadline.
	.delete(taskController.deleteTask);

module.exports = router;
