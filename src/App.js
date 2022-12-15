import "./App.css";
import ClockUI from "./components/ClockUI";
import { useEffect, useState } from "react";
import "./assets/fontstyle.css";

const App = () => {
  const [pomoDuration, setPomoDuration] = useState(25 * 60); //Hard coded default values for now, load in from user data in future.
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(10 * 60);

  const [active, setActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(Math.round(Date.now() / 1000)); //maybe redundant, set as undefined?
  const [carryTime, setCarryTime] = useState(0); //Time "carried over" from last stopped instance. Used when resumed
  const [lap, setLap] = useState(1); //Lap system used to alternate between short and long breaks
  const [remainingTime, setRemainingTime] = useState(pomoDuration); //initial time set to pomodoro length by default
  const [currentMode, setCurrentMode] = useState("pomo");

  const modeDurations = {
    pomo: pomoDuration,
    shortbreak: shortBreakDuration,
    longbreak: longBreakDuration,
  };

  const start = () => {
    setActive(true);
    setStartTime(Math.round(Date.now() / 1000));
  };
  const stop = () => {
    setActive(false);
    setCarryTime(elapsedTime);
  };

  const elapse = () => {
    const currentElapsedTime =
      carryTime + Math.round(Date.now() / 1000) - startTime;
    setElapsedTime(currentElapsedTime);
    if (remainingTime >= 1) {
      setRemainingTime(modeDurations[currentMode] - currentElapsedTime);
      if (remainingTime < 0) {
        setRemainingTime(0); //prevents displaying negative remaining time due to browser lag
      }
    }
  };

  const reset = () => {
    setActive(false);
    setElapsedTime(0);
    setCarryTime(0);
    setRemainingTime(modeDurations[currentMode]);
  };

  const changeMode = (mode = false) => {
    if (mode) {
      console.log(mode);
      setCurrentMode(mode);
      if (mode == "pomo") {
        setLap(1);
      } else if (mode == "shortbreak") {
        setLap(2);
      } else if (mode == "longbreak") {
        setLap(0);
      }
      setRemainingTime(modeDurations[mode]);
    } else {
      //if no mode provided, go next
      let currentLap = lap + 1; //variable currentLap used to avoid referencing out of date "lap" state
      setLap(currentLap);
      if (currentLap == 6) {
        setCurrentMode("longbreak");
        setRemainingTime(modeDurations["longbreak"]);
        setLap(0);
      } else if (currentMode == "pomo") {
        setCurrentMode("shortbreak");
        setRemainingTime(modeDurations["shortbreak"]);
      } else {
        setCurrentMode("pomo");
        setRemainingTime(modeDurations["pomo"]);
      }
    }
    //pseudo reset, manually adjusting remaining time instead of referencing out of date "currentMode".
    setActive(false);
    setElapsedTime(0);
    setCarryTime(0);
  };

  return (
    //    <Header />
    <ClockUI
      remainingTime={remainingTime}
      elapsedTime={elapsedTime}
      active={active}
      start={start}
      stop={stop}
      reset={reset}
      elapse={elapse}
      changeMode={changeMode}
    />
    //    <Tasks />
  );
};

export default App;
