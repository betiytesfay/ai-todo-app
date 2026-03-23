import React from 'react';

function TaskList({ tasks }) {

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No tasks yet
      </p>
    );
  }

  return (
    <div>

      {tasks.map((task) => (

        <div
          key={task.id}
          className="bg-gray-50 border rounded-lg p-3 mb-3 shadow-sm"
        >

          <h2 className="font-semibold text-lg">
            {task.title}
          </h2>

          <p className="text-gray-600">
            {task.description}
          </p>

          <span className={
            task.priority === "High"
              ? "text-red-500 font-semibold"
              : task.priority === "Low"
                ? "text-green-500 font-semibold"
                : "text-yellow-500 font-semibold"
          }>
            {task.priority}
          </span>

        </div>

      ))}

    </div>
  );
}

export default TaskList;