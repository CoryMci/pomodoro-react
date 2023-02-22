import React from "react";

export default function Settings(props) {
  const {
    pomoLength,
    setPomoLength,
    shortBreakLength,
    setShortBreakLength,
    longBreakLength,
    setLongBreakLength,
    settingsVisibility,
    setSettingsVisibility,
  } = props;

  const handlePomodoroChange = (e) => {
    setPomoLength(parseInt(e.target.value));
  };

  const handleShortBreakChange = (e) => {
    setShortBreakLength(parseInt(e.target.value));
  };

  const handleLongBreakChange = (e) => {
    setLongBreakLength(parseInt(e.target.value));
  };

  const handleIncreasePomodoroLength = () => {
    setPomoLength(pomoLength + 1);
  };

  const handleDecreasePomodoroLength = () => {
    if (pomoLength > 1) {
      setPomoLength(pomoLength - 1);
    }
  };

  const handleIncreaseShortBreakLength = () => {
    setShortBreakLength(shortBreakLength + 1);
  };

  const handleDecreaseShortBreakLength = () => {
    if (shortBreakLength > 1) {
      setShortBreakLength(shortBreakLength - 1);
    }
  };

  const handleIncreaseLongBreakLength = () => {
    setLongBreakLength(longBreakLength + 1);
  };

  const handleDecreaseLongBreakLength = () => {
    if (longBreakLength > 1) {
      setLongBreakLength(longBreakLength - 1);
    }
  };

  function handleCloseSettings(e) {
    e.stopPropagation();
    setSettingsVisibility(false);
  }

  return (
    settingsVisibility && (
      <>
        <div
          onClick={handleCloseSettings}
          className="fixed z-40 w-screen h-screen bg-black bg-opacity-30"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute rounded-xl bg-white w-1/4 h-min mx-auto inset-x-0 inset-y-1/4 p-4"
          >
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <button
              onClick={handleCloseSettings}
              className="material-symbols-outlined absolute top-2 right-2 font-bold text-gray-400 text-l"
            >
              close
            </button>
            <div className="mb-4">
              <label
                htmlFor="pomodoroLength"
                className="font-medium block mb-1"
              >
                Pomodoro Length (minutes)
              </label>
              <div className="grid grid-flow-col auto-cols-min items-center gap-2">
                <input
                  id="pomodoroLength"
                  name="pomodoroLength"
                  type="number"
                  min="1"
                  max="60"
                  className="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={pomoLength}
                  onChange={handlePomodoroChange}
                />
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleIncreasePomodoroLength}
                >
                  expand_less
                </span>
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleDecreasePomodoroLength}
                >
                  expand_more
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="shortBreakLength"
                className="font-medium block mb-1"
              >
                Short Break Length (minutes)
              </label>
              <div className="grid grid-flow-col auto-cols-min items-center gap-2">
                <input
                  id="shortBreakLength"
                  name="shortBreakLength"
                  type="number"
                  min="1"
                  max="60"
                  className="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={shortBreakLength}
                  onChange={handleShortBreakChange}
                />
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleIncreaseShortBreakLength}
                >
                  expand_less
                </span>
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleDecreaseShortBreakLength}
                >
                  expand_more
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="longBreakLength"
                className="font-medium block mb-1"
              >
                Long Break Length (minutes)
              </label>
              <div className="grid grid-flow-col auto-cols-min items-center gap-2">
                <input
                  id="longBreakLength"
                  name="longBreakLength"
                  type="number"
                  min="1"
                  max="60"
                  className="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={longBreakLength}
                  onChange={handleLongBreakChange}
                />
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleIncreaseLongBreakLength}
                >
                  expand_less
                </span>
                <span
                  className="material-symbols-outlined w-8 text-center bg-gray-100 shadow cursor-pointer"
                  onClick={handleDecreaseLongBreakLength}
                >
                  expand_more
                </span>
              </div>
            </div>
            <button
              className="rounded text-white bg-slate-700 hover:bg-slate-800 w-20 h-10 focus:outline-none focus:shadow-outline"
              onClick={handleCloseSettings}
            >
              Save
            </button>
          </div>
        </div>
      </>
    )
  );
}
