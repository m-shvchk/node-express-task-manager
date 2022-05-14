const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String, completed: Boolean
})
// Each schema in Mongoose maps to a MongoDB collection and defines the shape of the documents within that collection with specified data types. 

module.exports = mongoose.model("Task", TaskSchema)

// An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database. The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus the model "Task" is for "tasks" collection