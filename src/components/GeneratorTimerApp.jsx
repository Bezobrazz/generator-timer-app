import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Popup from "./Popup";

function GeneratorTimer() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const timerInterval = useRef(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("timerHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (running) {
      timerInterval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [running]);

  useEffect(() => {
    localStorage.setItem("timerHistory", JSON.stringify(history));
  }, [history]);

  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleDeleteHistory = (id) => {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    setHistory(updatedHistory);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime =
      (hours > 0 ? hours + " год " : "") +
      (minutes > 0 ? minutes + " хв " : "") +
      (remainingSeconds > 0 ? remainingSeconds + " сек" : "");

    return formattedTime.trim();
  };

  const startStopTimer = () => {
    if (running) {
      clearInterval(timerInterval.current);
      const currentDate = new Date();
      setHistory([
        ...history,
        { id: generateUniqueId(), time, date: currentDate },
      ]);
      setTime(0);
    }

    setRunning(!running);
  };
  const clearHistory = () => {
    setHistory([]);
  };

  const getTotalTimeInSeconds = () => {
    const totalTimeInSeconds = history.reduce((total, entry) => {
      return total + entry.time;
    }, 0);
    return totalTimeInSeconds;
  };

  return (
    <div className="container mt-4 text-center">
      <h1>Таймер Генератора</h1>
      <p className="fs-5">Час: {time > 0 ? formatTime(time) : "0"}</p>

      <button
        onClick={startStopTimer}
        className={
          running ? "btn btn-lg btn-danger mb-4" : "btn btn-lg btn-primary mb-4"
        }
      >
        {running ? "Стоп" : "Старт"}
      </button>
      <p className="fs-5">
        Загальний час роботи генератора: {formatTime(getTotalTimeInSeconds())}
      </p>
      <h6>Історія</h6>

      <div className="d-flex justify-content-end">
        <button onClick={clearHistory} className="btn btn-sm  btn-danger mb-1">
          видалити всю історію
        </button>
      </div>
      <ul className="list-group">
        {history
          .slice()
          .reverse()
          .map((entry, index) => (
            <li
              key={entry.id}
              className={`list-group-item ${
                index % 2 === 0
                  ? "list-group-item-primary"
                  : "list-group-item-secondary"
              } mb-2`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {new Date(entry.date).toLocaleString()} -{" "}
                  {formatTime(entry.time)}
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteHistory(entry.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
      </ul>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onReload={handleReload}
        onContinue={handleContinue}
      />
    </div>
  );
}

export default GeneratorTimer;
