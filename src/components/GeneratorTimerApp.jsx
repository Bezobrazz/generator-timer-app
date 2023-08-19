import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Pagination from "./Pagination";
import InkInfoPanel from "./InkInfoPanel";
import FuelConsumptionCalculator from "./FuelConsumptionCalculator";

function GeneratorTimer() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [fuelHistory, setFuelHistory] = useState([]);
  const timerInterval = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedHistory = localStorage.getItem("timerHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (running) {
        event.preventDefault();
        event.returnValue =
          "Обережно! Перезавантаження сторінки приведе до обнулення працюючого таймера";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(timerInterval.current);
    };
  }, [running]);

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
      const newEntry = { id: generateUniqueId(), time, date: currentDate };
      const updatedHistory = [newEntry, ...history]; // Додаємо новий запис першим елементом
      setHistory(updatedHistory);
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

  const displayedHistory = history
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .sort((a, b) => b.date - a.date);

  const handleFuelFilled = (newFuelEntry) => {
    setFuelHistory([...fuelHistory, newFuelEntry]);
  };
  const handleDeleteFuelEntry = (index) => {
    const updatedFuelHistory = [...fuelHistory];
    updatedFuelHistory.splice(index, 1);
    setFuelHistory(updatedFuelHistory);
  };

  useEffect(() => {
    const storedFuelHistory = localStorage.getItem("fuelHistory");
    if (storedFuelHistory) {
      setFuelHistory(JSON.parse(storedFuelHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fuelHistory", JSON.stringify(fuelHistory));
  }, [fuelHistory]);

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

      <InkInfoPanel
        totalTimeInSeconds={getTotalTimeInSeconds()}
        onReset={clearHistory}
      />

      <FuelConsumptionCalculator
        onFuelFilled={handleFuelFilled}
        fuelHistory={fuelHistory}
        setFuelHistory={setFuelHistory}
      />

      <h6 className="d-flex ">Історія заправок пальним</h6>
      <ul className="list-group">
        {fuelHistory.reverse().map((entry, index) => (
          <li
            key={index}
            className={`list-group-item list-group-item-warning mb-2`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                {entry.date} - {entry.amount} л
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteFuelEntry(index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between">
        <h6 className="align-self-end">Історія роботи генератора</h6>
        <button onClick={clearHistory} className="btn btn-sm  btn-danger mb-1">
          видалити всю історію
        </button>
      </div>
      <ul className="list-group">
        {displayedHistory.map((entry, index) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(history.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default GeneratorTimer;
