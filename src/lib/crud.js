import axios from "axios";
import storage from "../lib/storage";

export async function loadAll() {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: "http://localhost:3000",
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

export async function addTask(title, project = null) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
    headers: { Authorization: token },
  });
  const taskInfo = new URLSearchParams({
    title: title,
    project: project,
  });

  try {
    const response = await connection.post("/api/task", taskInfo);
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

export async function deleteTask(taskId) {
  const token = storage.getToken();
  const connection = axios.create({
    baseURL: "http://localhost:3000",
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
