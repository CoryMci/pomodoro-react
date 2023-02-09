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
    <div className="grid grid-cols-1 auto-rows-auto">
      {projects ? "Projects" : ""}
      {projects.map((project) => (
        <div key={project._id} className="bg-black bg-opacity-30">
          <h3>{project.title}</h3>
          <ul>
            {groupedTasks[project._id]?.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
      ))}
      {/* Orphan tasks */}
      {groupedTasks[null] ? (
        <div>
          <h3>Uncategorized</h3>
          <ul>
            {groupedTasks[null].map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
