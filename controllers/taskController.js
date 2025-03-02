const User = require("../database/model/user.model");
const Task = require("../database/model/task.model");
const { sendScheduledEmail } = require("../service/email.service");

const addTask = async (req, res) => {
  const { task, id, assignee, deadline } = req.body;
  console.log("body", { task, id, assignee, deadline });
  try {
    if (!task) return res.status(400).send("Please enter the task");
    if (task.length < 1)
      return res.status(400).send("Add a task with a minimum of 10 characters");

    const taskDetail = new Task({
      task,
      createdBy: id,
      deadline, // Include the deadline
      assignee,
      lastModifiedBy: id,
    });

    await taskDetail.save();
    let user = await User.findById(id);
    const assigneeId = await User.findById(assignee);
    console.log("user", user);
    console.log("assignee", assigneeId);
    const payload = {
  EMAIL_BODY_TEXT: `
    Hi ${assigneeId.username},

    You have a new task assigned to you on TaskHub!

    **Task Details:**

    * **Task Name:** ${task}
    * **Assigned by:** ${user.username}
    * **Due Date:** ${deadline}

   <p>To view and manage your task, please log in to your TaskHub account:</p>
          <p><a href="https://task-hub-green.vercel.app/signin" style="color: #007bff; text-decoration: none; font-weight: bold;">Click here to log in</a></p>
          <p>Best regards,</p>
          <p><strong>The TaskHub Team</strong></p>
    Best regards,

    The TaskHub Team
  `,
  EMAIL_SUBJECT: "New Task Assigned to You on TaskHub",
  BCC:null,
  CC:null,
  RECEIVERS_EMAIL: assigneeId.email,
};
    await sendScheduledEmail(payload);
    return res.status(200).send(taskDetail);
  } catch (error) {
    console.log("addtask error", error);
    return res.status(400).send("Task addition failed");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const admins = [
      "654fc813b904027ba97158df",
      "654295d5913733a6f63c965a",
      "654220d4f23dff4af39dae2d",
    ];
    const { id } = req.query;
    // console.log("id",id)
    let tasklist;
    if (admins.includes(id)) {
      tasklist = await Task.find({})
        .populate("createdBy lastModifiedBy assignee")
        .exec();
    } else {
      tasklist = await Task.find({ $or: [{ createdBy: id }, { assignee: id }] })
        .populate("createdBy lastModifiedBy assignee")
        .exec();
    }

    // console.log("tasklist", tasklist);
    // let tasklist = await Task.find({ cretedBy: id });
    return res.status(200).send(tasklist);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const editTask = async (req, res) => {};

const statusChange = async (req, res) => {
  const { id, value, modifiedby } = req.body;

  try {
    console.log("body",req.body)
    let task = await Task.findById({ _id: id });
    task.status = value;
    task.lastModifiedBy = modifiedby;
    task.save();
    res.send(task)
  }
    catch (error) {
    res.status(400).send("updateFailed");
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await Task.findByIdAndDelete(id);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send("deleteFailed");
  }
};
const getAdminAllTasks = async (req, res) => {
  // const { id } = req.query;
  try {
    let tasklist = await Task.find({});
    return res.status(200).send(tasklist);
  } catch (error) {
    return res.status(400).send(error);
  }
};
const priorityChange = async (req, res) => {
  const { id } = req.params; // id is coming from the route
  const { priority, userId } = req.body; // priority and userId from the request body

  try {
    // Find the task by its ID
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    // Update the task's priority
    task.priority = priority;
    task.lastModifiedBy = userId;

    // Save the updated task
    await task.save();

    // Respond with the updated task
    res.status(200).send(task);
  } catch (error) {
    console.log("Error updating task priority", error);
    return res.status(500).send("Priority update failed");
  }
};
const getTaskById = async (req, res) => {
  const { id } = req.params; // Get the task ID from the route parameters
  try {
      const task = await Task.findById(id).populate("createdBy lastModifiedBy assignee");
      if (!task) {
          return res.status(404).send("Task not found");
      }
      return res.status(200).send(task);
  } catch (error) {
      console.error("Error fetching task by ID", error);
      return res.status(500).send("Error fetching task");
  }
};

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
  priorityChange,
  getTaskById, // Include this
};
