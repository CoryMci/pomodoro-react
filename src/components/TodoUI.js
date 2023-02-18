import { useState, useEffect } from "react";
import { deleteProject, editProject } from "../lib/crud.js";
import { NewProject } from "./NewProject.js";
import { NewTask } from "./NewTask.js";
import { Project } from "./Project.js";
import { Task } from "./Task.js";
import tomato from "../assets/tomato.png";

export default function TodoUI(props) {
  const { userData, reload, setReload, selectedTask, setSelectedTask } = props;
  const tasks = userData.tasks;
  const projects = userData.projects;
  const logs = userData.logs;
  const [tomatos, setTomatos] = useState([1, 2, 3]); // temporary pomodoro count. to be implemented

  const groupedTasks = tasks.reduce((acc, task) => {
    const projectId = task.project ? task.project._id : null;

    if (!acc[projectId]) {
      acc[projectId] = []; //if projectID doesn't exist, create empty array
    }
    acc[projectId].push(task); //push task onto array
    return acc;
  }, {});

  const groupedLogs = logs.reduce((acc, log) => {
    const taskId = log.task ? log.task : null;

    if (!acc[taskId]) {
      acc[taskId] = []; //if taskId doesn't exist, create empty array
    }
    acc[taskId].push(log); //push task onto array
    return acc;
  }, {});

  const today = new Date();
  today.setHours(0, 0, 0, 0); // set time to 00:00 so time can match start date

  const pomosToday = logs.reduce((acc, log) => {
    const logDate = new Date(log.startTime);
    logDate.setHours(0, 0, 0, 0); //set time to 00:00 so time can match today

    if (logDate.getTime() == today.getTime() && log.completed) {
      acc.push(log);
    }
    return acc;
  }, []);

  return (
    <>
      <div className="text-center pb-12">
        {pomosToday.length > 0 ? (
          <div>
            Todays Pomdoros:
            <div>
              {pomosToday.map(() => (
                <img className="inline px-1" src={tomato} alt="tomato" />
              ))}
            </div>
          </div>
        ) : (
          "No pomodoros today!"
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 w-[32rem] auto-rows-auto">
        {projects.map((project) => (
          <Project
            key={project._id}
            project={project}
            tasks={groupedTasks[project._id]}
            groupedLogs={groupedLogs}
            reload={reload}
            setReload={setReload}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          ></Project>
        ))}
        {/* Orphan tasks */}
        {groupedTasks[null] ? (
          <div className="bg-black bg-opacity-30 rounded">
            <h3 className="text-xl">Uncategorized</h3>
            <ul className="grid auto-rows-min justify-items-center">
              {groupedTasks[null].map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  taskLogs={groupedLogs[task._id]}
                  reload={reload}
                  setReload={setReload}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                ></Task>
              ))}
              <NewTask
                project={null}
                reload={reload}
                setReload={setReload}
              ></NewTask>
            </ul>
          </div>
        ) : null}
        <NewProject reload={reload} setReload={setReload}></NewProject>
      </div>
    </>
  );
}
