import { useState, useEffect } from "react";
import { deleteProject, editProject } from "../lib/crud.js";
import { NewProject } from "./NewProject.js";
import { NewTask } from "./NewTask.js";
import { Project } from "./Project.js";
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
        <Project
          key={project._id}
          project={project}
          tasks={groupedTasks[project._id]}
          reload={reload}
          setReload={setReload}
        ></Project>
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
      <NewProject reload={reload} setReload={setReload}></NewProject>
    </div>
  );
}
