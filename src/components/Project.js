import { useState } from "react";
import { deleteProject, editProject } from "../lib/crud";
import { NewTask } from "./NewTask";
import { Task } from "./Task";

export function Project({ project, tasks, reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [error, setError] = useState(null);

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }

  function handleEditClick() {
    setTitle(project.title);
    setExpanded(true);
  }

  async function handleSaveClick() {
    try {
      await editProject(project._id, title); // Post task to API
    } catch (err) {
      setError("An error has occured, please try again!");
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }
  function handleCancelClick() {
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
        <div
          className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setError(null)}
        >
          <div
            className="p-5 bg-white text-black rounded"
            onClick={(e) => e.stopPropagation()}
          >
            {error}
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
              <h3 className="mb-2 col-span-10 text-2xl font-bold tracking-tight text-white">
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
    </>
  );
}
