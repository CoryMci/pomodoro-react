import ClockUI from "../components/ClockUI";
import TodoUI from "../components/TodoUI";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import "../assets/fontstyle.css";
import useTimer from "../hooks/useTimer";
import useLoadTodos from "../hooks/useLoadTodos";
import useTimerLog from "../hooks/useTimerLog";

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [bgColor, setBgColor] = useState({
    //Hard coded defaults, add custom colors later
    pomo: "bg-red-400",
    shortbreak: "bg-blue-400",
    longbreak: "bg-indigo-400",
  });

  const {
    remainingTime,
    elapsedTime,
    start,
    stop,
    reset,
    active,
    changeMode,
    currentMode,
    isOverTime,
  } = useTimer(selectedTask);

  useTimerLog(active, currentMode, elapsedTime, selectedTask);

  const { userData, loading, error, reload, setReload } = useLoadTodos();

  return (
    <div
      className={`p-4 grid auto-rows-min justify-center gap-12 text-white min-h-screen w-screen transition-colors cursor-default 
        ${bgColor[currentMode]}`}
    >
      <Header />
      <ClockUI
        remainingTime={remainingTime}
        elapsedTime={elapsedTime}
        active={active}
        start={start}
        stop={stop}
        reset={reset}
        changeMode={changeMode}
        isOverTime={isOverTime}
      />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Oops! An error occured: {error.message}</div>
        ) : (
          <TodoUI
            userData={userData}
            reload={reload}
            setReload={setReload}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
