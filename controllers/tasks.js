const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    // passing empty object to find means all tasks (no filter)
    // https://mongoosejs.com/docs/api.html#model_Model.find
    res.status(200).json({ tasks }); // {tasks: tasks}
  } catch (err) {
    res.status(500).json({ msg: err });
  }
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
// We pass req.body to it since there we expect to have { "name": "testing", "completed": true }
// Finally we send the created in the DB document as the response:
// { "task": { "_id": "627ffd9b39ff6348d84d8f50", "name": "testing", "completed": true, "__v": 0 } }

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params; // taskID is an alias not to get confused with tons of ids
    const task = await Task.findOne({_id: taskID}) // _id - id from mangoDB
    if(!task){
        return res.status(404).json({msg: `No task found with id: ${taskID}`})
    }
    res.status(200).json({ task });
    // res.status(200).json({ id: req.params.id });
    // for testing purposes: we make a get request for a specific item with "/api/v1/tasks/:id"
  } catch (err) {
    res.status(500).json({ msg: err });
  }
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
