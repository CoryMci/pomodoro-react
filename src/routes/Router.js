import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import App from "./App.js";

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
