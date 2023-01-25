import { useEffect } from "react";
import "./ClockUI.css";
import parseTime from "../helpers/parseTime";

export default function ClockUI(props) {
  const { remainingTime, elapsedTime, start, stop, reset, active, changeMode } =
    props;
  let resetBtn, toggleBtn, skipBtn;

  if (active) {
    resetBtn = (
      <div className="reset active">
        <span className="material-symbols-outlined" onClick={reset}>
          replay
        </span>
      </div>
    );
    toggleBtn = (
      <div className="toggle active" onClick={stop}>
        stop
      </div>
    );
    skipBtn = (
      <div
        className="skip active"
        onClick={() => {
          changeMode();
        }}
      >
        <span className="material-symbols-outlined">skip_next</span>
      </div>
    );
  } else {
    resetBtn = (
      <div className="reset">
        <span className="material-symbols-outlined">replay</span>
      </div>
    );
    toggleBtn = (
      <div className="toggle" onClick={start}>
        start
      </div>
    );
    skipBtn = (
      <div className="skip">
        <span className="material-symbols-outlined">skip_next</span>
      </div>
    );
  }
  return (
    <div className="timer">
      <div className="modes">
        <div
          id="pomo"
          onClick={() => {
            changeMode("pomo");
          }}
        >
          Pomodoro
        </div>
        <div
          id="shortbreak"
          onClick={() => {
            changeMode("shortbreak");
          }}
        >
          Short Break
        </div>
        <div
          id="longbreak"
          onClick={() => {
            changeMode("longbreak");
          }}
        >
          Long Break
        </div>
      </div>
      <div className="clocks">
        <div className="primaryclock">{parseTime(remainingTime)}</div>
        <div className="secondaryclock">{parseTime(elapsedTime)}</div>
      </div>

      <div className="controls">
        {resetBtn}
        {toggleBtn}
        {skipBtn}
      </div>
    </div>
  );
}
