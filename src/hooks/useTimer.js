import { useState, useEffect } from "react";

const Mode = Object.freeze({
  POMO: "pomo",
  SHORT_BREAK: "shortbreak",
  LONG_BREAK: "longbreak",
});

export default function useTimer(
  pomo = 25 * 60,
  short = 5 * 60,
  long = 10 * 60
) {
  const [pomoDuration, setPomoDuration] = useState(pomo); //Hard coded default values for now, load in from user data in future.
  const [shortBreakDuration, setShortBreakDuration] = useState(short);
  const [longBreakDuration, setLongBreakDuration] = useState(long);

  const modeDurations = {
    pomo: pomoDuration,
    shortbreak: shortBreakDuration,
    longbreak: longBreakDuration,
  };

  const [active, setActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(Math.round(Date.now() / 1000)); //maybe redundant, set as undefined?
  const [carryTime, setCarryTime] = useState(0); //Time "carried over" from last stopped instance. Used when resumed
  const [lap, setLap] = useState(1); //Lap system used to alternate between short and long breaks
  const [remainingTime, setRemainingTime] = useState(pomoDuration); //initial time set to pomodoro length by default
  const [currentMode, setCurrentMode] = useState("pomo");

  useEffect(() => {
    let tick = null;

    if (active) {
      tick = setInterval(() => {
        elapse();
      }, 1000);
    } else {
      clearInterval(tick);
    }
    return () => {
      clearInterval(tick);
    };
  });

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

  const isOverTime = () => {
    if (elapsedTime >= modeDurations[currentMode]) {
      return true;
    } else {
      return false;
    }
  };

  const start = () => {
    setActive(true);
    setStartTime(Math.round(Date.now() / 1000));
  };

  const stop = () => {
    setActive(false);
    setCarryTime(elapsedTime);
  };

  const reset = () => {
    setActive(false);
    setElapsedTime(0);
    setCarryTime(0);
    setRemainingTime(modeDurations[currentMode]);
  };

  const changeMode = (mode = false) => {
    if (mode) {
      setCurrentMode(mode);
      if (mode === Mode.POMO) {
        setLap(1);
      } else if (mode === Mode.SHORT_BREAK) {
        setLap(2);
      } else if (mode === Mode.LONG_BREAK) {
        setLap(0);
      }
      setRemainingTime(modeDurations[mode]);
    } else {
      //if no mode provided, go next
      let currentLap = lap + 1; //variable currentLap used to avoid referencing out of date "lap" state
      setLap(currentLap);
      if (currentLap == 6) {
        setCurrentMode(Mode.LONG_BREAK);
        setRemainingTime(modeDurations[Mode.LONG_BREAK]);
        setLap(0);
      } else if (currentMode === Mode.POMO) {
        setCurrentMode(Mode.SHORT_BREAK);
        setRemainingTime(modeDurations[Mode.SHORT_BREAK]);
      } else {
        setCurrentMode(Mode.POMO);
        setRemainingTime(modeDurations[Mode.POMO]);
      }
    }
    //pseudo reset, manually adjusting remaining time instead of referencing out of date "currentMode".
    setActive(false);
    setElapsedTime(0);
    setCarryTime(0);
  };

  return {
    remainingTime,
    elapsedTime,
    active,
    start,
    stop,
    reset,
    changeMode,
    currentMode,
    isOverTime,
  };
}
