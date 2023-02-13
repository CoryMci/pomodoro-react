import { useState } from "react";

export function Task({ task }) {
  const [isExpanded, setExpanded] = useState(false);

  function handleEditClick() {
    setExpanded(true);
  }

  function handleSaveClick() {
    setExpanded(false);
    // Save the changes to the task
  }

  function handleCancelClick() {
    setExpanded(false);
  }

  return (
    <li className="grid grid-cols-12 min-h-[48px] m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12">
      {isExpanded ? (
        <>
          <textarea
            className="p-2 col-span-10 resize-none overflow-hidden h-20 rounded-lg border-white focus-visible:outline-none bg-inherit"
            defaultValue={task.title}
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
          <span className="col-span-10">{task.title}</span>
          <span
            className="material-symbols-outlined cursor-pointer self-center justify-self-center"
            onClick={handleEditClick}
          >
            edit
          </span>
          <span className="material-symbols-outlined cursor-pointer self-center justify-self-center">
            delete
          </span>
        </>
      )}
    </li>
  );
}
