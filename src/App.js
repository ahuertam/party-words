import React, { useState, useEffect } from "react";
import WordButton from "./WordButton";
import ListSelector from "./ListSelector";
import animals from "./lists/animals.js";
import characters from "./lists/characters.js";

const professions = ["Doctor", "Ingeniero", "Maestro"];

const App = () => {
  const [currentList, setCurrentList] = useState(animals);
  const [currentWord, setCurrentWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const [useTimer, setUseTimer] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let timer;
    if (currentWord) {
      setIsTimeUp(false);
      timer = setTimeout(() => {
        setIsTimeUp(true);
      }, 3000); // 30000 ms = 30 segundos
    }
    return () => clearTimeout(timer);
  }, [currentWord]);
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
  const ActivateTimer = ({ onChange }) => {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={useTimer}
            onChange={(e) => onChange(e.target.checked)}
          />
          Usar temporizador (30 segundos por palabra)
        </label>
      </div>
    );
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
      <h1
        style={{
          backgroundColor: isTimeUp && useTimer ? "red" : "transparent",
        }}
      >
        {currentWord}
      </h1>
      <ActivateTimer onChange={setUseTimer} />
      <WordButton onClick={handleWordChange} />
      <ListSelector onChange={handleListChange} />
      <div>
        Instrucciones:
        <ul>
          <li>Presiona el botón para generar una palabra aleatoria.</li>
          <li>
            Selecciona la categoría de palabras que deseas utilizar en el juego.
          </li>
          <li>
            El juego reiniciará la lista de palabras una vez que se hayan
            utilizado todas.
          </li>
          <li>
            Puedes usar las palabras para jugar a las adivinanzas, para juegos
            de mimica, pictionary, etc.
          </li>
          <li>¡Diviértete!</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
