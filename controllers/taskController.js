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
      EMAIL_BODY_TEXT: `You have been assigned a new task on TaskHub, Here are the details
      task description : ${task},
      assigned By:${assigneeId.username},
      email:${assigneeId.email}, 
      deadline:${deadline},
      Best regards,
Neeraj NRK
CTO
NPT Stack
+91 7654690422`,
      EMAIL_SUBJECT: " TASKHUB: New task Assigned ",
      BCC: [],
      CC: [],
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
  const { id, string, modifiedby } = req.body;

  try {
    let task = await Task.findById({ _id: id });
    if (string === "right") {
      if (task.status === "backlog") {
        task.status = "todo";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      } else if (task.status === "todo") {
        task.status = "doing";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      } else if (task.status === "doing") {
        task.status = "done";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      }
    } else {
      if (task.status === "done") {
        task.status = "doing";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      } else if (task.status === "doing") {
        task.status = "todo";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      } else if (task.status === "todo") {
        task.status = "backlog";
        task.lastModifiedBy = modifiedby;
        task.save();
        return res.send(task);
      }
    }
  } catch (error) {
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

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
};
