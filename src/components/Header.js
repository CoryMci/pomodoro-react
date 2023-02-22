import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { setSettingsVisibility, setChartVisibility } = props;
  const navigate = useNavigate();

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header px-3 grid grid-cols-2 gap-48 items-center">
      <div className="title text-3xl font-extrabold">Pomodoro</div>
      <div className="tools justify-self-end grid grid-cols-3 gap-2">
        <span
          onClick={() => {
            setSettingsVisibility(true);
          }}
          className="settingsbtn material-symbols-outlined cursor-pointer"
        >
          settings
        </span>
        <span
          onClick={() => {
            setChartVisibility(true);
          }}
          className="reportbtn material-symbols-outlined cursor-pointer"
        >
          insert_chart
        </span>
        <span
          className="loginbtn material-symbols-outlined cursor-pointer"
          onClick={loginClick}
        >
          login
        </span>
      </div>
    </div>
  );
}
