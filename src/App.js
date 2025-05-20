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
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (currentWord && useTimer) {
      setSecondsLeft(30);
      setIsTimeUp(false);
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsTimeUp(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentWord, useTimer]);
  const handleWordChange = () => {
    const availableWords = currentList.filter(
      (word) => !usedWords.includes(word)
    );

    if (availableWords.length === 0) {
      setUsedWords([]);
      setCurrentWord("No hay más palabras disponibles. Reiniciando...");
      setTimeout(() => setCurrentWord(""), 2000); // Limpiar mensaje después de 2 segundos
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const randomWord = availableWords[randomIndex];
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
      {useTimer && (
        <div style={{
          fontSize: '2em',
          fontWeight: 'bold',
          color: secondsLeft <= 10 ? 'red' : 'black'
        }}>
          Tiempo restante: {secondsLeft} segundos
        </div>
      )}
      <ActivateTimer onChange={setUseTimer} />
      <button className="generate-button" onClick={handleWordChange}>
        Generar Nueva Palabra
      </button>
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
