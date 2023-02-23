import ClockUI from "../components/ClockUI";
import TodoUI from "../components/TodoUI";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import "../assets/fontstyle.css";
import useTimer from "../hooks/useTimer";
import useLoadTodos from "../hooks/useLoadTodos";
import useTimerLog from "../hooks/useTimerLog";
import Settings from "../components/Settings";
import TimeChart from "../components/TimeChart";

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [bgColor, setBgColor] = useState({
    //Hard coded defaults, add custom colors later
    pomo: "bg-red-400",
    shortbreak: "bg-blue-400",
    longbreak: "bg-indigo-400",
  });
  const [pomoLength, setPomoLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [settingsVisibility, setSettingsVisibility] = useState(false);
  const [chartVisibility, setChartVisibility] = useState(false);

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
  } = useTimer(pomoLength, shortBreakLength, longBreakLength); //clock functionality

  const { userData, loading, error, reload, setReload } = useLoadTodos(); //loader for todos from db

  useTimerLog(
    active,
    currentMode,
    elapsedTime,
    selectedTask,
    isOverTime,
    error
  ); //logging functions to save timer data to db

  return (
    <>
      {loading ? (
        <></>
      ) : error ? (
        <></>
      ) : (
        <TimeChart
          userData={userData}
          chartVisibility={chartVisibility}
          setChartVisibility={setChartVisibility}
        />
      )}
      <Settings
        pomoLength={pomoLength}
        setPomoLength={setPomoLength}
        shortBreakLength={shortBreakLength}
        setShortBreakLength={setShortBreakLength}
        longBreakLength={longBreakLength}
        setLongBreakLength={setLongBreakLength}
        settingsVisibility={settingsVisibility}
        setSettingsVisibility={setSettingsVisibility}
      />
      <div
        className={`p-4 grid auto-rows-min justify-center gap-12 text-white min-h-screen w-screen transition-colors cursor-default 
        ${bgColor[currentMode]}`}
      >
        <Header
          setSettingsVisibility={setSettingsVisibility}
          setChartVisibility={setChartVisibility}
        />
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
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div></div>
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
    </>
  );
};

export default App;
