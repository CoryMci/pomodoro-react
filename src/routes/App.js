import ClockUI from "../components/ClockUI";
import TodoUI from "../components/TodoUI";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import "../assets/fontstyle.css";
import useTimer from "../hooks/useTimer";
import useLoadTodos from "../hooks/useLoadTodos";

const App = () => {
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
  } = useTimer();

  const { todos, loading, error, reload, setReload } = useLoadTodos();

  return (
    <div className="grid auto-rows-min justify-center gap-12 bg-red-400 text-white h-screen w-screen transition-colors cursor-default">
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
          <TodoUI todos={todos} reload={reload} setReload={setReload} />
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
