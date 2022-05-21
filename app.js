const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')

// middleware 
app.use(express.static('./public')) // connecting frontend
app.use(express.json()) 
// app.use applies express.json to every route; 
// method inbuilt in express to recognize the incoming req object (post and put) as JSON Object 

// routes
// app.get('/(route)', (req, res) =>{res.send('Task Manager App')})

app.use('/api/v1/tasks', tasks)
// applies tasks for every route that starts with '/api/v1/tasks'

app.use(notFound) // this SHOULD be placed AFTER other app.use() calls

const port = 3000;

// connectDB returns a promise, that's why async
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI); // env variables are accessed with process.env.<var_name>
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start()