import React from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
} from "chart.js";

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function TimeChart(props) {
  const { userData, chartVisibility, setChartVisibility } = props;
  const tasks = userData.tasks;
  const logs = userData.logs;

  Chart.register(
    LineElement,
    CategoryScale,
    PointElement,
    BarElement,
    LinearScale,
    Tooltip,
    Title
  );

  const taskTitleById = {};
  tasks.forEach((task) => {
    taskTitleById[task._id] = task.title;
  });

  const taskData = {};
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    dates.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
  }

  tasks.forEach((task) => {
    taskData[task.title] = {
      label: task.title,
      data: Array(dates.length).fill(0),
      backgroundColor: randomColor(),
    };
  });

  logs.forEach((log) => {
    const taskId = log.task;
    const date = moment(log.startTime).startOf("day").format("YYYY-MM-DD");
    const taskTitle = taskTitleById[taskId];
    const task = taskData[taskTitle];
    if (task) {
      const index = dates.indexOf(date);
      if (index !== -1) {
        task.data[index] += log.duration;
      }
    }
  });

  const chartData = {
    labels: dates,
    datasets: Object.values(taskData),
  };

  return (
    chartVisibility && (
      <div className="fixed z-40 w-screen h-screen bg-black bg-opacity-30">
        <div className="absolute rounded-xl bg-white w-1/4 h-min mx-auto inset-x-0 inset-y-1/4 p-4">
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Task Time Chart",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return context.dataset.label;
                    },
                    title: function (context) {
                      return (
                        moment
                          .duration(context[0].parsed.y, "minutes")
                          .asHours()
                          .toFixed(2) + " hrs"
                      );
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    )
  );
}
