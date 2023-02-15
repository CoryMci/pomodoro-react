import { useState } from "react";
import { completeTask, deleteTask, editTask } from "../lib/crud";

export function Task({
  task,
  reload,
  setReload,
  selectedTask,
  setSelectedTask,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState(null);

  function handleTitleInput(e) {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setError("Task title must be between 3 and 50 characters.");
    } else {
      setError("");
    }
  }

  function handleEditClick(e) {
    e.stopPropagation();
    setTitle(task.title);
    setExpanded(true);
  }

  async function handleSaveClick(e) {
    e.stopPropagation();
    if (title.length < 3 || title.length > 50) {
      setError("Task title must be between 3 and 50 characters.");
      return;
    } else if (error) {
      return;
    }
    try {
      await editTask(task._id, title); // Post task to API
    } catch (err) {
      setError("An error has occured, please try again!");
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }

  function handleCancelClick(e) {
    setError("");
    setExpanded(false);
    e.stopPropagation();
  }

  async function handleDeleteClick(e) {
    e.stopPropagation();
    setLoading(true);
    try {
      await deleteTask(task._id);
      setReload(!reload); //reload todos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteClick(e) {
    e.stopPropagation();
    setLoading(true);
    try {
      await completeTask(task._id, !task.completed);
      setReload(!reload); //reload todos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectClick() {
    if (selectedTask === task._id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task._id);
    }
  }

  return (
    <>
      <li
        className={`${
          selectedTask === task._id
            ? "bg-green-300 hover:bg-green-400"
            : "bg-white hover:bg-gray-100"
        } grid grid-cols-12 min-h-[48px] m-2 text-black border border-gray-200 shadow rounded-lg w-11/12 cursor-pointer`}
        onClick={handleSelectClick}
      >
        {error && (
          <div className="absolute -translate-x-full">
            <div className="flex text-right p-2">
              <div className="text-white bg-red-500">{error}</div>
              <div class="border-solid border-l-red-500 border-l-[12px] border-y-transparent border-y-[12px] border-r-0 h-0 w-0"></div>
            </div>
          </div>
        )}
        {isExpanded ? (
          <>
            <textarea
              className="p-2 col-span-10 resize-none overflow-hidden h-20 rounded-lg border-white focus-visible:outline-none bg-inherit"
              value={title}
              onChange={handleTitleInput}
            />
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
            {!loading ? (
              <>
                <span
                  className="material-symbols-outlined self-center justify-self-center"
                  onClick={handleCompleteClick}
                >
                  {task.completed ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className="col-span-9">{task.title}</span>
                <span
                  className="material-symbols-outlined self-center justify-self-center"
                  onClick={handleEditClick}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined self-center justify-self-center"
                  onClick={handleDeleteClick}
                >
                  delete
                </span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined self-center justify-self-center">
                  {task.completed ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className="col-span-9">{task.title}</span>
                <span className="material-symbols-outlined self-center justify-self-center text-gray-700">
                  edit
                </span>
                <span className="material-symbols-outlined self-center justify-self-center text-gray-700">
                  delete
                </span>
              </>
            )}
          </>
        )}
      </li>
    </>
  );
}
