import { useState } from "react";
import { serverLogin, serverRegister } from "../lib/auth.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
    setAlert(false);
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
    } else if (response) {
      setAlert(response);
    }
  }

  return (
    <div className="grid justify-center items-center bg-red-400 h-screen w-screen transition-colors cursor-default">
      <div className="grid gap-12">
        <div className="header px-3 justify-self-center">
          <div
            className="title text-3xl font-extrabold cursor-pointer text-white"
            onClick={() => navigate("/")}
          >
            Pomodoro
          </div>
          <div className="text-center text-white py-8">Register</div>
        </div>
        <div className="rounded-xl p-6 bg-white">
          <div className="alert h-8 my-5">
            {alert ? (
              <div className="grid justify-center items-center px-2 rounded w-min-content h-full bg-red-100 text-sm">
                {alert}
              </div>
            ) : (
              <div className="grid justify-center items-center px-2 rounded w-min-content h-full"></div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="grid grid-rows-3 gap-8">
            <div className="grid grid-rows-2">
              <label
                className="text-gray-400 text-xs tracking-wide self-end"
                htmlFor="name"
              >
                USERNAME
              </label>
              <input
                className="bg-gray-200 pl-2 font-thin focus-visible:outline-none"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameInput}
              ></input>
            </div>
            <div className="grid grid-rows-2">
              <label
                className="text-gray-400 text-xs tracking-wide self-end"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                className="bg-gray-200 pl-2 font-thin focus-visible:outline-none"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordInput}
              ></input>
            </div>
            <button
              className="bg-gray-500 rounded text-white"
              type="login"
              value="Register"
            >
              Register
            </button>
          </form>
          <div className="text-gray-500 text-center pt-8">
            Already have an account?
            <div
              className="text-gray-500 underline inline pl-2 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
