// src/ListSelector.js
import React from "react";

const ListSelector = ({ onChange }) => {
  return (
    <div>
      <button onClick={() => onChange("Animales")}>Animales</button>
      <button onClick={() => onChange("Profesiones")}>Profesiones</button>
      <button onClick={() => onChange("Personajes")}>Personajes</button>
    </div>
  );
};

export default ListSelector;
