import React from "react";

function Popup({ isOpen, onClose, onReload, onContinue }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <p>
          Обережно! Перезавантаження сторінки приведе до обнулення працюючого
          таймера
        </p>
        <button onClick={onReload}>Перезавантажити</button>
        <button onClick={onContinue}>Продовжити роботу</button>
      </div>
    </div>
  );
}

export default Popup;
