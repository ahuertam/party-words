import React from "react";

const WordButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="generate-button"
      onClick={onClick}
      aria-label="Generar nueva palabra"
    >
      {children || "Generar Nueva Palabra"}
    </button>
  );
};

export default WordButton;
