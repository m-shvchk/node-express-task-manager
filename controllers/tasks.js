const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
// With <model name>.create we create a new document in the DB.
// We pass req.body to it since there we exect to have { "name": "testing", "completed": true }
// Finally we send the created in the DB document as the response:
// { "task": { "_id": "627ffd9b39ff6348d84d8f50", "name": "testing", "completed": true, "__v": 0 } }

const getTask = (req, res) => {
  res.json({ id: req.params.id });
  // for testing purposes: we make a get request for a specific item with "/api/v1/tasks/:id"
  // where 'id' for testing purposes is any string
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
