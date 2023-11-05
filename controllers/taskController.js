const User = require('../database/model/user.model');
const Task = require('../database/model/task.model');

const addTask = async (req, res) => {
	const { task, id, deadline } = req.body;
 console.log("deadline>",deadline)
	try {
		if (!task) return res.status(400).send('Please enter the task');
		if (task.length < 10) return res.status(400).send('Add a task with a minimum of 10 characters');

		const taskDetail = new Task({
			task,
			createdBy: id,
			deadline, // Include the deadline
			lastModifiedBy:id,
		});

		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('Task addition failed');
	}
};


const getAllTasks = async (req, res) => {
	// const { id } = req.query;
	try {
			let tasklist = await Task.find({})
		.populate('createdBy lastModifiedBy')
		.exec();
		console.log("tasklist",tasklist)
		// let tasklist = await Task.find({ cretedBy: id });
		return res.status(200).send(tasklist);
	} catch (error) {
				return res.status(400).send(error);
	}
};

const editTask = async (req, res) => {};

const statusChange = async (req, res) => {
	const { id, string ,modifiedby} = req.body;
 
	try {
				let task = await Task.findById({ _id: id });
				if (string === 'right') {
			if (task.status === 'backlog') {
				task.status = 'todo';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			} else if (task.status === 'todo') {
				task.status = 'doing';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			} else if (task.status === 'doing') {
				task.status = 'done';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			}
		} else {
			if (task.status === 'done') {
				task.status = 'doing';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			} else if (task.status === 'doing') {
				task.status = 'todo';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			} else if (task.status === 'todo') {
				task.status = 'backlog';
				task.lastModifiedBy = modifiedby;
				task.save();
				return res.send(task);
			}
		}
		
		
	} catch (error) {
		res.status(400).send('updateFailed');
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};
const getAdminAllTasks = async (req, res) => {
	// const { id } = req.query;
	try {
		let tasklist = await Task.find({  });
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};


module.exports = {
	addTask,
	getAllTasks,
	editTask,
	statusChange,
	deleteTask,
};