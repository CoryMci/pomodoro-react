import { useEffect, useState } from "react";

export default function useTimerLog(
  active,
  currentMode,
  elapsedTime,
  selectedTask
) {
  const [logId, setLogId] = useState(null);
  useEffect(() => {
    if (!(currentMode === "pomo")) {
      setLogId(null);
    }
    if (currentMode === "pomo" && elapsedTime > 0) {
      console.log(elapsedTime);
    }
  }, [active, currentMode, elapsedTime, selectedTask]);
}
