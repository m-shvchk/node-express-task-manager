const express = require('express');
const app = express();
const tasks = require('./routes/tasks')

// middleware 

app.use(express.json()) 
// app.use applies express.json to every route; 
// method inbuilt in express to recognize the incoming req object (post and put) as JSON Object 

// routes
app.get('/hello', (req, res) =>{
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks) 
// applies tasks for every route that starts with '/api/v1/tasks'


// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get ('/api/v1/tasks/:id')   - get a single task
// app.patch('/api/v1/tasks/:id')  - update a task
// app.delete('/api/v1/tasks/:id') - delete a task

const port = 3000;
app.listen(port, console.log(`server listening on port ${port}...`));