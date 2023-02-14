import { useState } from "react";
import { deleteTask, editTask } from "../lib/crud";

export function Task({ task, reload, setReload }) {
  const [isExpanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }

  function handleEditClick() {
    setTitle(task.title);
    setExpanded(true);
  }

  async function handleSaveClick() {
    try {
      await editTask(task._id, title); // Post task to API
    } catch (err) {
      alert(err);
    }
    setExpanded(false);
    setTitle("");
    setReload(!reload); //reload todos
  }

  function handleCancelClick() {
    setExpanded(false);
  }

  async function handleDeleteClick() {
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

  return (
    <li className="grid grid-cols-12 min-h-[48px] m-2 bg-white text-black border border-gray-200 shadow hover:bg-gray-100 rounded-lg w-11/12">
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
          <span className="col-span-10">{task.title}</span>
          {!loading ? (
            <>
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
          ) : (
            <>
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
  );
}
