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
import parseTime from "../helpers/parseTime";

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function TimeChart(props) {
  const { userData, chartVisibility, setChartVisibility, AuthError } = props;
  const tasks = userData.tasks || [];
  const logs = userData.logs || [];

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
  let TotalTime = 0;
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
        TotalTime += log.duration;
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
        <div
          onClick={(e) => e.stopPropagation()}
          className="grid grid-flow-row gap-4 absolute rounded-xl bg-white w-5/6 sm:w-5/6 md:max-w-lg h-min mx-auto my-auto inset-x-0 inset-y-0 p-4"
        >
          {AuthError ? (
            <h2 className="text-xl font-medium mb-4">
              Please sign in to view report!
            </h2>
          ) : (
            <h2 className="text-xl font-medium mb-4">Report</h2>
          )}

          <button
            onClick={handleCloseChart}
            className="material-symbols-outlined absolute top-2 right-2 font-bold text-gray-400 text-l"
          >
            close
          </button>
          <div className="border border-red-400 w-max rounded-md overflow-hidden h-max-max">
            <button
              className={`font-bold  text-l border-r px-3 ${
                dateRange == 6 ? "bg-red-400 text-white" : "text-red-400"
              }`}
              onClick={(e) => handleDateRangeChange(e, 6)}
            >
              Past week
            </button>

            <button
              className={`font-boldtext-l px-3 ${
                dateRange == 6 ? "text-red-400" : "bg-red-400 text-white"
              }`}
              onClick={(e) => handleDateRangeChange(e, 30)}
            >
              Past month
            </button>
          </div>
          <div>
            <div className="text-gray-500 uppercase tracking-tight text-xs m-2">
              Total time this {dateRange == 6 ? "Week" : "Month"}
            </div>
            <div className="tracking-tight text-3xl m-2">
              {parseTime(TotalTime)}
            </div>
          </div>

          <div className="w-full h-auto border-t-2 font-bold">
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
                        // Convert the tick value from seconds to hours and format it as "hh:mm". Different method than parseTime lib because of chart functionality
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
      </div>
    )
  );
}
