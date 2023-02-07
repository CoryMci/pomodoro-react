import { useState } from "react";
import { serverLogin, serverRegister } from "../lib/auth.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await serverRegister(username, password);
    if (response == 200) {
      //Registration successful, Send login request
      const loginResponse = await serverLogin(username, password);
      if (loginResponse == 200) {
        navigate("/");
      }
    } else if (response == 302) {
      setAlertMessage("Username taken!");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameInput}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
          ></input>
        </div>
        <button type="register" value="Register">
          Register
        </button>
        <div>{alertMessage}</div>
      </form>
    </div>
  );
}
