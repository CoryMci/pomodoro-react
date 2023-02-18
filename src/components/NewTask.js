import { useState } from "react";
import { addTask } from "../lib/crud";

export function NewTask({ project, reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(1);

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

  function handleEditClick() {
    setExpanded(true);
  }

  async function handleSaveClick() {
    if (title.length < 3 || title.length > 250) {
      setError("Task title must be between 3 and 250 characters.");
      return;
    } else if (error) {
      return;
    }
    try {
      await addTask(title, estimatedTime, project); // Post task to API
    } catch (err) {
      alert("An error has occured, please try again!");
    }

    setExpanded(false);
    setTitle("");
    setEstimatedTime(1);
    setReload(!reload); //reload todos
  }

  function handleCancelClick() {
    setTitle("");
    setError("");
    setEstimatedTime(1);
    setExpanded(false);
  }

  return (
    <>
      {isExpanded ? (
        <li className="grid auto-rows-min min-h-[48px] m-2 bg-white text-black border border-gray-200 shadow rounded-lg w-11/12 overflow-hidden">
          {error && (
            <div className="absolute -translate-x-full">
              <div className="flex text-right p-2">
                <div className="text-white bg-red-500">{error}</div>
                <div className="border-solid border-l-red-500 border-l-[12px] border-y-transparent border-y-[12px] border-r-0 h-0 w-0"></div>
              </div>
            </div>
          )}
          <textarea
            className="p-3 resize-none overflow-hidden h-20 rounded-lg border-white focus-visible:outline-none bg-inherit"
            value={title}
            onChange={handleTitleInput}
            placeholder="Task name"
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
          <div className="bg-gray-200 flex flex-row-reverse">
            <button
              className="rounded text-white bg-slate-700 w-20 h-10 m-2"
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
          </div>
        </li>
      ) : (
        <li className="grid h-12 m-2 bg-transparent text-gray-200 border border-gray-200 hover:text-white hover:border-white border-dashed shadow cursor-pointer rounded-lg w-11/12">
          <span
            className="material-symbols-outlined  w-full text-center self-center"
            onClick={handleEditClick}
          >
            add
          </span>
        </li>
      )}
    </>
  );
}
