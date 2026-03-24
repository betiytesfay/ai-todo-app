import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const taskWithAI = {
      ...task,
      priority: getAIPriority(task.title)
    };

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskWithAI),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };
  const updateTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const updated = await res.json();
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };
  function getAIPriority(title) {
    const text = title.toLowerCase();
    if (text.includes('urgent') || text.includes('finish')) return 'High';
    if (text.includes('optional') || text.includes('later')) return 'Low';
    return 'Normal';
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          AI Todo App
        </h1>

        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />

      </div>
    </div>
  );
}

export default App;