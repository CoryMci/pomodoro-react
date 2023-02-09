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
