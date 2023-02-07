import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="title">Pomodoro</div>
      <div className="tools">
        <span className="settingsbtn material-symbols-outlined">settings</span>
        <span className="reportbtn material-symbols-outlined">
          insert_chart
        </span>
        <span
          className="loginbtn material-symbols-outlined"
          onClick={loginClick}
        >
          login
        </span>
      </div>
    </div>
  );
}
