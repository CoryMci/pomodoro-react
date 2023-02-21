import { useState, useEffect } from "react";

const Mode = Object.freeze({
  POMO: "pomo",
  SHORT_BREAK: "shortbreak",
  LONG_BREAK: "longbreak",
});

export default function useTimer(
  pomoDuration = 25,
  shortBreakDuration = 5,
  longBreakDuration = 10
) {
  // const [pomoDuration, setPomoDuration] = useState(pomo * 60); //Hard coded default values for now, load in from user data in future.
  // const [shortBreakDuration, setShortBreakDuration] = useState(short * 60);
  // const [longBreakDuration, setLongBreakDuration] = useState(long * 60);

  const modeDurations = {
    pomo: pomoDuration * 60,
    shortbreak: shortBreakDuration * 60,
    longbreak: longBreakDuration * 60,
  };

  const [active, setActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(Math.round(Date.now() / 1000)); //maybe redundant, set as undefined?
  const [carryTime, setCarryTime] = useState(0); //Time "carried over" from last stopped instance. Used when resumed
  const [lap, setLap] = useState(1); //Lap system used to alternate between short and long breaks
  const [remainingTime, setRemainingTime] = useState(pomoDuration * 60); //initial time set to pomodoro length by default
  const [currentMode, setCurrentMode] = useState("pomo");

  useEffect(() => {
    setRemainingTime(modeDurations[currentMode] - elapsedTime); //to update time when user changes clock times
  }, [pomoDuration, shortBreakDuration, longBreakDuration]);

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
