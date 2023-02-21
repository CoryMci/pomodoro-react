import { useState } from "react";
import { completeTask, deleteTask, editTask } from "../lib/crud";

export function Task({
  task,
  taskLogs,
  reload,
  setReload,
  selectedTask,
  setSelectedTask,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(task.estimatedTime);

  function handleTitleInput(e) {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 250) {
      setError("Task title must be between 3 and 250 characters.");
    } else {
      setError("");
    }
  }

  function handleEstimatedTimeInput(e) {
    setEstimatedTime(e.target.value);
    if (e.target.value < 1 || e.target.value > 100) {
      setError("Estimated pomodoros must be between 1 and 100");
    } else {
      setError("");
    }
  }

  function handleIncreaseTime() {
    setEstimatedTime(parseInt(estimatedTime) + 1);
  }

  function handleDecreaseTime() {
    if (parseInt(estimatedTime) > 1) {
      setEstimatedTime(parseInt(estimatedTime) - 1);
    }
  }

  function handleEditClick(e) {
    e.stopPropagation();
    setTitle(task.title);
    setExpanded(true);
  }

  async function handleSaveClick(e) {
    e.stopPropagation();
    if (title.length < 3 || title.length > 250) {
      setError("Task title must be between 3 and 250 characters.");
      return;
    } else if (error) {
      return;
    }
    try {
      await editTask(task._id, title, estimatedTime); // Post task to API
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
    if (!isExpanded) {
      //if task is NOT expanded/being edited, select/deselect
      if (selectedTask === task._id) {
        setSelectedTask(null);
      } else {
        setSelectedTask(task._id);
      }
    }
  }

  return (
    <>
      <li
        className={`${
          selectedTask === task._id
            ? "bg-green-300 hover:bg-green-400"
            : "bg-white hover:bg-gray-100"
        } min-h-[48px] m-2 text-black border border-gray-200 shadow rounded-lg w-11/12 overflow-hidden`}
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
          <div className="grid auto-rows-min bg-white hover:bg-white">
            <textarea
              className="p-3 resize-none overflow-hidden h-20 rounded-lg border-white focus-visible:outline-none bg-inherit"
              value={title}
              onChange={handleTitleInput}
            />
            <div className="p-3">
              <label
                htmlFor="estimatedTime"
                className="block text-gray-700 font-bold mb-2"
              >
                Estimated pomodoros
              </label>
              <div className="grid grid-flow-col auto-cols-min items-center gap-2">
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="number"
                  pattern="[0-9]*"
                  className="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
                  placeholder="Enter estimated time in hours"
                  value={estimatedTime}
                  onChange={handleEstimatedTimeInput}
                />
                <span
                  className="material-symbols-outlined w-12 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleIncreaseTime}
                >
                  expand_less
                </span>
                <span
                  className="material-symbols-outlined w-12 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleDecreaseTime}
                >
                  expand_more
                </span>
              </div>
            </div>
            <div className="bg-gray-200 flex flex-row-reverse w-full">
              <button
                className="rounded text-white bg-slate-700 hover:bg-slate-800 w-20 h-10 m-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="w-20 h-10 m-2 text-slate-700"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="w-20 h-10 m-2 text-white bg-red-700 cursor-pointer rounded mr-auto"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="grid-flow-col grid h-full cursor-pointer">
            {!loading ? (
              <>
                <span
                  className="material-symbols-outlined self-center justify-self-center"
                  onClick={handleCompleteClick}
                >
                  {task.completed ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className="col-span-10">{task.title}</span>
                <span className="self-center text-gray-700">
                  {taskLogs ? taskLogs.length : 0}/{task.estimatedTime}
                </span>
                <span
                  className="material-symbols-outlined self-center justify-self-center"
                  onClick={handleEditClick}
                >
                  edit
                </span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined self-center justify-self-center">
                  {task.completed ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span className="col-span-10">{task.title}</span>
                <span className="material-symbols-outlined self-center justify-self-center text-gray-700">
                  edit
                </span>
              </>
            )}
          </div>
        )}
      </li>
    </>
  );
}
