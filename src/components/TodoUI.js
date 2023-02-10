import { useState, useEffect } from "react";

export default function TodoUI(props) {
  const { todos } = props;
  const tasks = todos.tasks;
  const projects = todos.projects;

  const groupedTasks = tasks.reduce((acc, task) => {
    const projectId = task.project ? task.project._id : null;

    if (!acc[projectId]) {
      acc[projectId] = []; //if projectID doesn't exist, create empty array
    }
    acc[projectId].push(task); //push task onto array
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 gap-3 auto-rows-auto indent-2">
      {projects.map((project) => (
        <div key={project._id} className="bg-black bg-opacity-30 rounded">
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {project.title}
          </h3>
          <ul className="grid auto-rows-min justify-items-center">
            {groupedTasks[project._id]?.map((task) => (
              <li
                className="h-12 m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12"
                key={task._id}
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Orphan tasks */}
      {groupedTasks[null] ? (
        <div className="bg-black bg-opacity-30 rounded">
          <h3 className="text-xl">Uncategorized</h3>
          <ul className="grid auto-rows-min justify-items-center">
            {groupedTasks[null].map((task) => (
              <li
                className="h-12 m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12"
                key={task._id}
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
