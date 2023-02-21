import axios from "axios";
import storage from "../lib/storage";
const api = "https://pomodoro-api-production-98e7.up.railway.app";

export async function loadAll() {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });

  try {
    const response = await connection.get("/api/user/summary");
    if (response.status === 200) {
      return response.data.summary;
    } else {
      throw new Error("Authorization Error");
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error);
    } else {
      throw err;
    }
  }
}

export async function addTask(title, EstimatedTime, project = null) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const taskInfo = !(project == null)
    ? new URLSearchParams({
        title: title,
        project: project,
      })
    : new URLSearchParams({
        title: title, //if project == null, dont send project info
      });

  try {
    const response = await connection.post("/api/task", taskInfo);
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.message);
    } else {
      throw err;
    }
  }
}

export async function deleteTask(taskId) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });

  try {
    const response = await connection.delete(`/api/task/${taskId}`);
    if (response.status === 200) {
      return;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error);
    } else {
      throw err;
    }
  }
}

export async function editTask(taskId, title, estimatedTime) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const taskInfo = new URLSearchParams({
    title: title,
    estimatedTime: estimatedTime,
  });
  try {
    const response = await connection.put(`/api/task/${taskId}`, taskInfo);
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 422) {
        throw new Error("Invalid input!");
      }
    } else {
      throw new Error(err.message);
    }
  }
}

export async function completeTask(taskId, completed) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const taskInfo = new URLSearchParams({ completed: completed });
  try {
    const response = await connection.put(`/api/task/${taskId}`, taskInfo);
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 422) {
        throw new Error("Invalid input!");
      }
    } else {
      throw new Error(err.message);
    }
  }
}

export async function addProject(title) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const projectInfo = new URLSearchParams({
    title: title,
  });

  try {
    const response = await connection.post("/api/project", projectInfo);
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response);
    } else {
      throw err;
    }
  }
}

export async function deleteProject(projectId) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });

  try {
    const response = await connection.delete(`/api/project/${projectId}`);
    if (response.status === 200) {
      return;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error);
    } else {
      throw err;
    }
  }
}

export async function editProject(projectId, title) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const projectInfo = new URLSearchParams({
    title: title,
  });

  try {
    const response = await connection.put(
      `/api/project/${projectId}`,
      projectInfo
    );
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error);
    } else {
      throw err;
    }
  }
}

export async function addLog(task = null, completed = false) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });

  let logInfo; // omit "task" parameter if null due to database validation interaction.
  if (task == null) {
    logInfo = new URLSearchParams({
      completed: completed,
    });
  } else {
    logInfo = new URLSearchParams({
      task: task,
      completed: completed,
    });
  }

  try {
    const response = await connection.post("/api/log", logInfo);
    if (response.status === 201 && response.data.id) {
      return response.data.id;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response);
    } else {
      throw err;
    }
  }
}

export async function editLog(logId, duration, completed, task) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: api,
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });

  let logInfo;
  if (task == null) {
    logInfo = new URLSearchParams({
      completed: completed,
      duration: duration,
    });
  } else {
    logInfo = new URLSearchParams({
      completed: completed,
      duration: duration,
      task: task,
    });
  }

  try {
    const response = await connection.put(`/api/log/${logId}`, logInfo);
    if (response.status === 201) {
      return;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error);
    } else {
      throw err;
    }
  }
}
