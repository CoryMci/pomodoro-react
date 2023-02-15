import { useState } from "react";
import { addTask } from "../lib/crud";

export function NewTask({ project, reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  function handleTitleInput(e) {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setError("Task title must be between 3 and 50 characters.");
    } else {
      setError("");
    }
  }

  function handleEditClick() {
    setExpanded(true);
  }

  async function handleSaveClick() {
    if (title.length < 3 || title.length > 50) {
      setError("Task title must be between 3 and 50 characters.");
      return;
    } else if (error) {
      return;
    }
    try {
      await addTask(title, project); // Post task to API
    } catch (err) {
      alert("An error has occured, please try again!");
    }

    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }

  function handleCancelClick() {
    setTitle("");
    setError("");
    setExpanded(false);
  }

  return (
    <>
      {isExpanded ? (
        <li className="grid grid-cols-12 min-h-[48px] m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12">
          {error && (
            <div className="absolute -translate-x-full">
              <div className="flex text-right p-2">
                <div className="text-white bg-red-500">{error}</div>
                <div className="border-solid border-l-red-500 border-l-[12px] border-y-transparent border-y-[12px] border-r-0 h-0 w-0"></div>
              </div>
            </div>
          )}
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
