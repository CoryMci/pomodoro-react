import { useState } from "react";
import { addProject } from "../lib/crud";

export function NewProject({ reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleTitleInput(e) {
    setTitle(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 50) {
      setError("Project title must be between 3 and 50 characters.");
    } else {
      setError("");
    }
  }

  function handleEditClick() {
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
      await addProject(title); // Post task to API
    } catch (err) {
      alert("An error has occured, please try again!");
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }

  function handleCancelClick() {
    setError("");
    setTitle("");
    setExpanded(false);
  }

  return (
    <div className="">
      {error && (
        <div className="absolute -translate-x-full flex text-right p-2">
          <div className="text-white bg-red-500">{error}</div>
          <div className="border-solid border-l-red-500 border-l-[12px] border-y-transparent border-y-[12px] border-r-0 h-0 w-0"></div>
        </div>
      )}
      <div className="col-span-11">
        {isExpanded ? (
          <li className="grid grid-cols-12 min-h-[48px] bg-black bg-opacity-30 text-white rounded w-full">
            <textarea
              className="p-2 col-span-10 resize-none overflow-hidden h-20 rounded-lg focus-visible:outline-none bg-transparent"
              value={title}
              onChange={handleTitleInput}
              placeholder="Project title"
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
          <div className="grid bg-black bg-opacity-30 rounded cursor-pointer">
            <span
              className="self-center justify-self-center material-symbols-outlined"
              onClick={handleEditClick}
            >
              add
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
