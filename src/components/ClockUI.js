import { useEffect } from "react";
import parseTime from "../helpers/parseTime";

export default function ClockUI(props) {
  const {
    remainingTime,
    elapsedTime,
    start,
    stop,
    reset,
    active,
    changeMode,
    isOverTime,
  } = props;
  let resetBtn, toggleBtn, skipBtn, secondaryClock;

  if (active) {
    resetBtn = (
      <div className="reset justify-self-end cursor-pointer">
        <span className="material-symbols-outlined" onClick={reset}>
          replay
        </span>
      </div>
    );
    toggleBtn = (
      <div
        className="toggle grid items-center cursor-pointer col-span-2 justify-self-center self-center text-center bg-slate-300 rounded w-full h-full"
        onClick={stop}
      >
        stop
      </div>
    );
    skipBtn = (
      <div
        className="skip cursor-pointer"
        onClick={() => {
          changeMode();
        }}
      >
        <span className="material-symbols-outlined">skip_next</span>
      </div>
    );
  } else {
    resetBtn = (
      <div className="reset opacity-0">
        <span className="material-symbols-outlined">replay</span>
      </div>
    );
    toggleBtn = (
      <div
        className="toggle grid items-center cursor-pointer -translate-y-1 shadow-[0_4px_0px_0px_rgba(0,0,0,0.3)] col-span-2 justify-self-center self-center text-center bg-slate-300 rounded w-full h-full"
        onClick={start}
      >
        start
      </div>
    );
    skipBtn = (
      <div className="skip opacity-0">
        <span className="material-symbols-outlined">skip_next</span>
      </div>
    );
  }

  if (isOverTime()) {
    secondaryClock = (
      <div className="secondaryclock transition-opacity">
        {parseTime(elapsedTime)}
      </div>
    );
  } else {
    secondaryClock = (
      <div className="secondaryclock transition-opacity opacity-0">
        {parseTime(elapsedTime)}
      </div>
    );
  }
  return (
    <div className="grid grid-rows-4 rounded-3xl p-6 bg-black bg-opacity-30 min-w-fit">
      <div className="modes grid grid-cols-3 h-8 gap-4 justify-items-center items-center">
        <div
          className="w-28 p-2 rounded text-center transition-colors hover:bg-white hover:bg-opacity-30 hover:cursor-pointer"
          id="pomo"
          onClick={() => {
            changeMode("pomo");
          }}
        >
          Pomodoro
        </div>
        <div
          className="w-28 p-2 rounded text-center transition-colors hover:bg-white hover:bg-opacity-30 hover:cursor-pointer"
          id="shortbreak"
          onClick={() => {
            changeMode("shortbreak");
          }}
        >
          Short Break
        </div>
        <div
          className="w-28 p-2 rounded text-center transition-colors hover:bg-white hover:bg-opacity-30 hover:cursor-pointer"
          id="longbreak"
          onClick={() => {
            changeMode("longbreak");
          }}
        >
          Long Break
        </div>
      </div>
      <div className="row-span-2 justify-items-center grid grid-rows-4">
        <div className="primaryclock row-span-3 font-bold text-8xl justify-self-center self-end">
          {parseTime(remainingTime)}
        </div>
        {secondaryClock}
      </div>

      <div className="controls self-end grid grid-cols-4 h-10 gap-4 m:gap-8 items-center">
        {resetBtn}
        {toggleBtn}
        {skipBtn}
      </div>
    </div>
  );
}
