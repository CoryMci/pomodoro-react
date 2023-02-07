import "../App.css";
import ClockUI from "../components/ClockUI";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import "../assets/fontstyle.css";
import useTimer from "../hooks/useTimer";
import storage from "../lib/storage";

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

  return (
    <div className={`App ${currentMode}`}>
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
      <div className="footer"></div>
    </div>
  );
};

export default App;
