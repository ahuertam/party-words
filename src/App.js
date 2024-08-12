import React, { useState } from "react";
import WordButton from "./WordButton";
import ListSelector from "./ListSelector";
import animals from "./lists/animals.js";
import characters from "./lists/characters.js";

const professions = ["Doctor", "Ingeniero", "Maestro"];

const App = () => {
  const [currentList, setCurrentList] = useState(animals);
  const [currentWord, setCurrentWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);

  const handleWordChange = () => {
    const availableWords = currentList.filter(
      (word) => !usedWords.includes(word)
    );

    if (availableWords.length === 0) {
      setUsedWords([]);
      setCurrentWord("No hay más palabras disponibles. Reiniciando...");
      return;
    }

    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setUsedWords([...usedWords, randomWord]);
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
      <h1> {currentWord}</h1>
      <WordButton onClick={handleWordChange} />
      <ListSelector onChange={handleListChange} />
    </div>
  );
};

export default App;
