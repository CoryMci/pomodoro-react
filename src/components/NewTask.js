import { useState } from "react";

export function NewTask() {
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

  return isExpanded ? (
    <li className="grid grid-cols-12 min-h-[48px] m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12">
      <textarea
        className="p-2 col-span-10 resize-none overflow-hidden h-20 rounded-lg border-white focus-visible:outline-none bg-inherit"
        defaultValue=""
      />
      <button className="material-symbols-outlined" onClick={handleSaveClick}>
        save
      </button>
      <button className="material-symbols-outlined" onClick={handleCancelClick}>
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
  );
}
