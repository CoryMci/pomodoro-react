export default function parseTime(seconds) {
  let hr = Math.floor(seconds / 3600);
  let hrRemainder = seconds % 3600;
  let min = Math.floor(hrRemainder / 60);
  let sec = hrRemainder % 60;

  // if 0 hours, don't display any numbers
  let strHr = hr > 0 ? `${hr}:` : "";

  let strMin = min > 9 ? min : `0${min}`;
  let strSec = sec > 9 ? sec : `0${sec}`;

  return `${strHr}${strMin}:${strSec}`;
}
