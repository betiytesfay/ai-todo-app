import React, { useState } from 'react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [filter, setFilter] = useState('All');

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter(task => task.priority === filter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-4">
        {['All', 'High', 'Normal', 'Low'].map(p => (
          <button
            key={p}
            className={`px-3 py-1 rounded ${filter === p
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-400">No tasks yet</p>
      )}

      {filteredTasks.map(task => (
        <div
          key={task.id}
          className={`p-3 mb-3 border rounded-lg shadow-sm flex justify-between items-center ${task.done ? 'bg-green-100' : 'bg-gray-50'
            }`}
        >
          <div>
            <h2 className={`font-semibold text-lg ${task.done ? 'line-through' : ''}`}>
              {task.title}
            </h2>
            <p className={`text-gray-600 ${task.done ? 'line-through' : ''}`}>
              {task.description}
            </p>
            <span
              className={
                task.priority === 'High'
                  ? 'text-red-500 font-semibold'
                  : task.priority === 'Low'
                    ? 'text-green-500 font-semibold'
                    : 'text-yellow-500 font-semibold'
              }
            >
              {task.priority}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex space-x-2">
            <CheckIcon
              className="w-6 h-6 text-green-500 cursor-pointer"
              onClick={() => updateTask({ ...task, done: !task.done })}
            />
            <PencilIcon
              className="w-6 h-6 text-blue-500 cursor-pointer"
              onClick={() => {
                const newTitle = prompt('Edit title', task.title);
                const newDesc = prompt('Edit description', task.description);
                if (newTitle !== null) {
                  updateTask({ ...task, title: newTitle, description: newDesc });
                }
              }}
            />
            <TrashIcon
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;