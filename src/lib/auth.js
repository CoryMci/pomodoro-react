import axios from "axios";
import storage from "./storage";

export async function serverLogin(username, password) {
  const connection = axios.create({
    baseURL: "https://pomodoro-api-production-98e7.up.railway.app",
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
  });

  const userInfo = new URLSearchParams({
    username: username,
    password: password,
  });

  try {
    const response = await connection.post("/login", userInfo);
    if (response.status === 200) {
      storage.setToken(response.data.token);
      return 200;
    } else {
      return "Authorization Error";
    }
  } catch (err) {
    console.log("test");
    console.log(err);
  }
}

export async function serverRegister(username, password) {
  const connection = axios.create({
    baseURL: "https://pomodoro-api-production-98e7.up.railway.app",
    timeout: 5000,
    signal: AbortSignal.timeout(5000),
  });

  const userInfo = new URLSearchParams({
    username: username,
    password: password,
  });

  try {
    const response = await connection.post("/register", userInfo);
    if (response.status === 200) {
      return 200;
    } else {
      return "Authorization Error";
    }
  } catch (err) {
    console.log(err);
  }
}
