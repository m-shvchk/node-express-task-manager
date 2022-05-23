const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  // passing empty object to find means all tasks (no filter)
  // https://mongoosejs.com/docs/api.html#model_Model.find
  res.status(200).json({ tasks });
  // other possible responses:
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success: true, data: {tasks, nbHits: tasks.length} }); // number of hits
});
// here we are wrapping the controller with our async wrapper to handle try-catch block there

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
// With <model name>.create we create a new document in the DB.
// We pass req.body to it since there we expect to have { "name": "testing", "completed": true }
// Finally we send the created in the DB document as the response:
// { "task": { "_id": "627ffd9b39ff6348d84d8f50", "name": "testing", "completed": true, "__v": 0 } }

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params; // taskID is an alias not to get confused with tons of ids
  const task = await Task.findOne({ _id: taskID }); // _id - id from mangoDB
  if (!task) {
    //   const error = new Error('Not Found');
    //   error.status = 404;
    //   return next(error);
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
  // res.status(200).json({ id: req.params.id });
  // for testing purposes: we make a get request for a specific item with "/api/v1/tasks/:id"
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
    //   return res.status(404).json({ msg: `No task found with id: ${taskID}` });
  }
  res.status(200).json({ task });
  // we send back deleted task for better illustration in Postman. Other types of responsers:
  // res.status(200).send());
  // res.status(200).json({ task: null, status: 'success'});
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  // third argument - options:
  // without 'new:true' we will update the task but res.json({task}) will show the old task
  // without 'runValidators:true' we can update the task with empty string (validators -> TaskShema)
  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404))
}
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
