// import React from "react";
// import "./InkInfoPanel.css";

// function InkInfoPanel({ totalTimeInSeconds, onReset }) {
//   const maxHours = 50;
//   const filledPercentage = (totalTimeInSeconds / (maxHours * 3600)) * 100;

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     return `${hours} год ${minutes} хв ${remainingSeconds} сек`;
//   };

//   return (
//     <div className="ink-info-panel">
//       <h2>Інформація про мастило</h2>
//       <div className="ink-progress">
//         <div
//           className="ink-progress-bar"
//           style={{ width: `${filledPercentage}%` }}
//         ></div>
//       </div>
//       <p>Загальний час роботи генератора: {formatTime(totalTimeInSeconds)}</p>
//       <button className="btn btn-danger" onClick={onReset}>
//         Скинути відлік
//       </button>
//     </div>
//   );
// }

// export default InkInfoPanel;

import React from "react";
import "./InkInfoPanel.css";

function InkInfoPanel({ totalTimeInSeconds, onReset }) {
  const maxHours = 50;
  const remainingTimeInSeconds = maxHours * 3600 - totalTimeInSeconds;
  const filledPercentage = (totalTimeInSeconds / (maxHours * 3600)) * 100;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} год ${minutes} хв ${remainingSeconds} сек`;
  };

  return (
    <div className="ink-info-panel mb-3">
      <h3>Заміна мастила через...</h3>
      <div className="ink-progress">
        <div
          className="ink-progress-bar"
          style={{ width: `${filledPercentage}%` }}
        ></div>
      </div>
      <p>{formatTime(remainingTimeInSeconds)}</p>
      <button className="btn btn-sm btn-danger" onClick={onReset}>
        Скинути відлік
      </button>
    </div>
  );
}

export default InkInfoPanel;
