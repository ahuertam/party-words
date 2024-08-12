import React, { useState } from "react";
import WordButton from "./WordButton";
import ListSelector from "./ListSelector";

const animals = ["Perro", "Gato", "Elefante"];
const professions = ["Doctor", "Ingeniero", "Maestro"];
const characters = ["Harry Potter", "Sherlock Holmes", "Batman"];

const App = () => {
  const [currentList, setCurrentList] = useState(animals);
  const [currentWord, setCurrentWord] = useState("");

  const handleWordChange = () => {
    const randomWord =
      currentList[Math.floor(Math.random() * currentList.length)];
    setCurrentWord(randomWord);
  };

  const handleListChange = (listName) => {
    switch (listName) {
      case "Animales":
        setCurrentList(animals);
        break;
      case "Profesiones":
        setCurrentList(professions);
        break;
      case "Personajes":
        setCurrentList(characters);
        break;
      default:
        setCurrentList([]);
    }
    setCurrentWord("");
  };

  return (
    <div>
      <h1>Palabra: {currentWord}</h1>
      <WordButton onClick={handleWordChange} />
      <ListSelector onChange={handleListChange} />
    </div>
  );
};

export default App;
