import React, { useState } from "react";

function FuelConsumptionCalculator({
  onFuelFilled,
  fuelHistory,
  onDeleteFuelEntry,
}) {
  const [fuelAmount, setFuelAmount] = useState("");
  const [isFilled] = useState(false);

  const handleFuelAmountChange = (event) => {
    const input = event.target.value;
    if (/^\d*$/.test(input)) {
      setFuelAmount(input);
    }
  };

  const handleFuelSubmit = (e) => {
    e.preventDefault();
    if (fuelAmount !== "") {
      const currentDate = new Date();
      const newFuelEntry = {
        date: currentDate.toLocaleString(),
        amount: parseFloat(fuelAmount),
      };
      onFuelFilled(newFuelEntry);
      setFuelAmount("");
    }
  };

  return (
    <div className="fuel-consumption-calculator">
      <h2>Споживання пального</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введіть кількість пального цифрами"
          value={fuelAmount}
          onChange={handleFuelAmountChange}
        />
        <button
          onClick={handleFuelSubmit}
          className="btn btn-success"
          disabled={isFilled}
        >
          Залити пальне
        </button>
      </div>
      <h6 className="d-flex ">Історія заправок пальним</h6>
      <ul className="list-group">
        {fuelHistory.map((entry, index) => (
          <li
            key={index}
            className={`list-group-item ${
              index % 2 === 0
                ? "list-group-item-warning"
                : "list-group-item-secondary"
            } mb-2`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>
                {entry.date} - {entry.amount} л
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteFuelEntry(index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FuelConsumptionCalculator;
