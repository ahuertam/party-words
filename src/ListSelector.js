// src/ListSelector.js
import React from "react";
import './ListSelector.css'; // Nuevo archivo CSS para estilos

const ListSelector = ({ onChange }) => {
  return (
    <div className="list-selector">
      <button 
        className="category-btn" 
        onClick={() => onChange("Animales")}
      >
        🐾 Animales
      </button>
      <button 
        className="category-btn" 
        onClick={() => onChange("Profesiones")}
      >
        👔 Profesiones
      </button>
      <button 
        className="category-btn" 
        onClick={() => onChange("Personajes")}
      >
        🦸 Personajes
      </button>
    </div>
  );
};

export default ListSelector;
