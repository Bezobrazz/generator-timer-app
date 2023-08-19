import React, { useState } from "react";

// import "./FuelConsumptionCalculator.css";

function FuelConsumptionCalculator({ onFuelFilled }) {
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
    </div>
  );
}

export default FuelConsumptionCalculator;
