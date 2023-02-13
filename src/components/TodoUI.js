import { useState, useEffect } from "react";
import { NewTask } from "./NewTask.js";
import { Task } from "./Task.js";

export default function TodoUI(props) {
  const { todos, reload, setReload } = props;
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
              <Task
                key={task._id}
                task={task}
                reload={reload}
                setReload={setReload}
              ></Task>
            ))}
            <NewTask
              project={project._id}
              reload={reload}
              setReload={setReload}
            ></NewTask>
          </ul>
        </div>
      ))}
      {/* Orphan tasks */}
      {groupedTasks[null] ? (
        <div className="bg-black bg-opacity-30 rounded">
          <h3 className="text-xl">Uncategorized</h3>
          <ul className="grid auto-rows-min justify-items-center">
            {groupedTasks[null].map((task) => (
              <Task
                key={task._id}
                task={task}
                reload={reload}
                setReload={setReload}
              ></Task>
            ))}
            <NewTask
              project={null}
              reload={reload}
              setReload={setReload}
            ></NewTask>
          </ul>
        </div>
      ) : null}
      <div className="grid bg-black bg-opacity-30 rounded  cursor-pointer">
        {" "}
        <span
          className="self-center justify-self-center material-symbols-outlined"
          onClick="n"
        >
          add
        </span>
      </div>
    </div>
  );
}
