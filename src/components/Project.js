import { useState } from "react";
import { deleteProject, editProject } from "../lib/crud";
import { NewTask } from "./NewTask";
import { Task } from "./Task";

export function Project({
  logs,
  project,
  tasks,
  reload,
  setReload,
  selectedTask,
  setSelectedTask,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [error, setError] = useState(null);

  const groupedLogs = logs.reduce((acc, log) => {
    const taskId = log.task ? log.task : null;

    if (!acc[taskId]) {
      acc[taskId] = []; //if taskId doesn't exist, create empty array
    }
    acc[taskId].push(log); //push task onto array
    return acc;
  }, {});

  function handleTitleInput(e) {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setError("Project title must be between 3 and 50 characters.");
    } else {
      setError("");
    }
  }

  function handleEditClick() {
    setTitle(project.title);
    setExpanded(true);
  }

  async function handleSaveClick() {
    if (title.length < 3 || title.length > 50) {
      setError("Project title must be between 3 and 50 characters.");
      return;
    } else if (error) {
      return;
    }
    try {
      await editProject(project._id, title); // Post project to API
    } catch (err) {
      setError("An error has occured, please try again!");
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }
  function handleCancelClick() {
    setError("");
    setExpanded(false);
  }

  async function handleDeleteClick() {
    //TODO add warning message, delete all tasks in database under same project
    setLoading(true);
    try {
      await deleteProject(project._id);
      setReload(!reload); //reload todos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="absolute">
          <div className="flex text-right -translate-x-full p-2">
            <div className="text-white bg-red-500">{error}</div>
            <div class="border-solid border-l-red-500 border-l-[12px] border-y-transparent border-y-[12px] border-r-0 h-0 w-0"></div>
          </div>
        </div>
      )}
      <div className="bg-black bg-opacity-30 rounded">
        <div className="grid grid-cols-12">
          {isExpanded ? (
            <>
              <textarea
                className="mb-2 col-span-10 text-2xl font-bold tracking-tight focus-visible:outline-none bg-transparent text-white"
                value={title}
                onChange={handleTitleInput}
              >
                {project.title}
              </textarea>
              <button
                className="material-symbols-outlined"
                onClick={handleSaveClick}
              >
                save
              </button>
              <button
                className="material-symbols-outlined"
                onClick={handleCancelClick}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="mb-2 col-span-10 text-2xl font-bold tracking-tight text-white indent-2">
                {project.title}
              </h3>
              <span
                className="material-symbols-outlined cursor-pointer self-center justify-self-center"
                onClick={handleEditClick}
              >
                edit
              </span>
              <span
                className="material-symbols-outlined cursor-pointer self-center justify-self-center"
                onClick={handleDeleteClick}
              >
                delete
              </span>
            </>
          )}
        </div>
        <ul className="grid auto-rows-min justify-items-center">
          {tasks?.map((task) => (
            <Task
              key={task._id}
              taskLogs={groupedLogs[task._id]}
              task={task}
              reload={reload}
              setReload={setReload}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            ></Task>
          ))}
          <NewTask
            project={project._id}
            reload={reload}
            setReload={setReload}
          ></NewTask>
        </ul>
      </div>
    </>
  );
}
