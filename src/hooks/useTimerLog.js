import { useEffect, useState } from "react";
import { addLog, editLog } from "../lib/crud";

export default function useTimerLog(
  active,
  currentMode,
  elapsedTime,
  selectedTask,
  isOverTime,
  error
) {
  const [logId, setLogId] = useState(null);
  const [lastElapsed, setLastElapsed] = useState(0);
  const [lastCompleted, setLastCompleted] = useState(false);
  const [logData, setLogData] = useState({});

  useEffect(() => {
    let timeoutId;
    if (!error) {
      const updateLogs = async (logData) => {
        try {
          await Promise.all(
            Object.entries(logData).map(([logId, data]) =>
              editLog(
                logId,
                data.elapsedTime,
                data.Completed,
                data.selectedTask
              )
            )
          );
        } catch (err) {
          console.log(err);
          return;
        }
      };

      const updateLogData = (logId, elapsedTime, Completed, selectedTask) => {
        setLogData((prevData) => ({
          ...prevData,
          [logId]: { elapsedTime, Completed, selectedTask },
        }));
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updateLogs(logData);
        }, 5000); //updates after 5 seconds have passed and another update has not been called.
      };

      const newLog = async () => {
        try {
          const id = await addLog(selectedTask, isOverTime());
          setLogId(id);
          updateLogData(id, elapsedTime, isOverTime(), selectedTask);
        } catch (err) {
          console.log(err);
          return;
        }
      };

      if (!(currentMode === "pomo")) {
        setLogId(null);
        if (!(logData == {})) {
          updateLogs(logData); //force update of data from queue
          setLogData({}); //clear old update queue
        }
      } else {
        if (logId) {
          updateLogData(logId, elapsedTime, isOverTime(), selectedTask); //add to update queue
        } else if (elapsedTime > 0) {
          updateLogs(logData); //force update of data from queue
          setLogData({}); //clear old update queue
          newLog(); //Record new log
        }
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentMode, active, selectedTask, logId, elapsedTime]);

  return logId;
}
