const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());
let tasks = [];
app.get('/', (req, res) => res.send('Backend is running!'));

// get all tasks
app.get('/tasks', (req, res) => res.json(tasks));

// add task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || '',
    priority: req.body.priority || 'Normal',
    done: false,
    dueDate: req.body.dueDate || null
  };
  tasks.push(newTask);
  res.json(newTask);
});

// edit task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.done = req.body.done !== undefined ? req.body.done : task.done;
  task.dueDate = req.body.dueDate !== undefined ? req.body.dueDate : task.dueDate;

  res.json(task);
});

// delete task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Deleted successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));