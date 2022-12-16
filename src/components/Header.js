import "./Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div className="title">Pomodoro</div>
      <div className="tools">
        <span className="settingsbtn material-symbols-outlined">settings</span>
        <span className="reportbtn material-symbols-outlined">
          insert_chart
        </span>
      </div>
    </div>
  );
}
