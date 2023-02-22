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
import { useState } from "react";

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

  const [dateRange, setDateRange] = useState(6);

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
  for (let i = dateRange; i >= 0; i--) {
    dates.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
  }

  tasks.forEach((task) => {
    taskData[task.title] = {
      label: task.title,
      data: Array(dates.length).fill(0),
      backgroundColor: randomColor(),
    };
  });

  taskData["Null"] = {
    label: "No Task",
    data: Array(dates.length).fill(0),
    backgroundColor: randomColor(),
  };

  logs.forEach((log) => {
    const taskId = log.task;
    const date = moment(log.startTime).startOf("day").format("YYYY-MM-DD");
    const taskTitle = taskTitleById[taskId];
    const task = taskData[taskTitle] || taskData["Null"];
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

  function handleCloseChart(e) {
    e.stopPropagation();
    setChartVisibility(false);
  }

  function handleDateRangeChange(e, length) {
    e.stopPropagation();
    setDateRange(length);
  }

  return (
    chartVisibility && (
      <div
        onClick={handleCloseChart}
        className="fixed z-40 w-screen h-screen bg-black bg-opacity-30"
      >
        <div className="absolute rounded-xl bg-white w-1/4 h-min mx-auto inset-x-0 inset-y-1/4 p-4">
          <button
            onClick={handleCloseChart}
            className="material-symbols-outlined absolute top-2 right-2 font-bold text-gray-400 text-l"
          >
            close
          </button>
          <div className="bg-red-500 w-max rounded-md">
            <button
              className="font-bold text-gray-500 text-l mx-3"
              onClick={(e) => handleDateRangeChange(e, 6)}
            >
              Last week
            </button>

            <button
              className="font-bold text-gray-500 text-l mx-3"
              onClick={(e) => handleDateRangeChange(e, 30)}
            >
              Last month
            </button>
          </div>

          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  ticks: {
                    callback: function (value) {
                      // Convert the tick value from seconds to hours and format it as "hh:mm"
                      const hours = Math.floor(value / 3600);
                      const minutes = Math.floor((value % 3600) / 60);
                      return `${hours.toString().padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}`;
                    },
                  },
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
                          .duration(context[0].parsed.y, "seconds")
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
