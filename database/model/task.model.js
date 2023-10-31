const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		task: { type: String },
		status: {
			type: String,
			enum: ['backlog', 'todo', 'doing', 'done'],
			default: 'backlog',
		},
		createdAt: { type: Date, default: Date.now }, // Include createdAt timestamp
		deadline: { type: Date }, // Include deadline field for tasks
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		lastModifiedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
