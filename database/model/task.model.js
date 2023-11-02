const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		task: { type: String },
		status: {
			type: String,
			enum: ['Backlog', 'Todo', 'Doing', 'Done'],
			default: 'Backlog',
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
