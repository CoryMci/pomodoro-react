import { useState } from "react";
import { addProject } from "../lib/crud";

export function NewProject({ reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }

  function handleEditClick() {
    setExpanded(true);
  }

  async function handleSaveClick() {
    try {
      await addProject(title); // Post task to API
    } catch (err) {
      setError("An error has occured, please try again!");
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }

  function handleCancelClick() {
    setTitle("");
    setExpanded(false);
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
            onClick={(e) => e.stopPropagation()} //prevent event from drifting upwards
          >
            {error}
          </div>
        </div>
      )}
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
        <div className="grid bg-black bg-opacity-30 rounded  cursor-pointer">
          <span
            className="self-center justify-self-center material-symbols-outlined"
            onClick={handleEditClick}
          >
            add
          </span>
        </div>
      )}
    </>
  );
}
