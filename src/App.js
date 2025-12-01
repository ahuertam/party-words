import React, { useState, useEffect } from "react";
import ListSelector from "./ListSelector";
import WordButton from "./WordButton";
import './App.css';
import animals from "./lists/animals.js";
import characters from "./lists/characters.js";
import professions from "./lists/professions.js";

const App = () => {
  const [currentList, setCurrentList] = useState(animals);
  const [currentWord, setCurrentWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const [useTimer, setUseTimer] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const DURATION = 30;

  const playBeep = (type = 'generate') => {
    if (!soundOn || typeof window === 'undefined') return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    if (type === 'timeup') {
      o.frequency.value = 880; // A5
      g.gain.value = 0.04;
      o.start(0);
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        o.stop(ctx.currentTime + 0.3);
        ctx.close();
      }, 10);
    } else {
      o.frequency.value = 520; // subtle
      g.gain.value = 0.03;
      o.start(0);
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        o.stop(ctx.currentTime + 0.2);
        ctx.close();
      }, 10);
    }
  };

  useEffect(() => {
    let timer;
    if (currentWord && useTimer) {
      setSecondsLeft(DURATION);
      setIsTimeUp(false);
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            playBeep('timeup');
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
    playBeep('generate');
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
    <div className="App">
      <div className="word-card">
        <h1 className={`word ${isTimeUp && useTimer ? 'timeup' : ''}`}>
          {currentWord}
        </h1>
        {useTimer && (
          <>
            <div className={`timer ${secondsLeft <= 10 ? 'timer-danger' : ''}`}>
              Tiempo restante: {secondsLeft}s
            </div>
            <div className="progress" aria-label="Barra de tiempo">
              <div
                className="progress-bar"
                style={{ width: `${(secondsLeft / DURATION) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>
      <div className="controls">
        <ActivateTimer onChange={setUseTimer} />
        <label>
          <input
            type="checkbox"
            checked={soundOn}
            onChange={(e) => setSoundOn(e.target.checked)}
          />
          Sonido sutil
        </label>
        <WordButton onClick={handleWordChange} />
      </div>
      <ListSelector onChange={handleListChange} />
      <div className="instructions">
        <p>Instrucciones</p>
        <ul>
          <li>Presiona el botón para generar una palabra aleatoria.</li>
          <li>Selecciona la categoría que deseas utilizar.</li>
          <li>La lista se reinicia cuando se usan todas las palabras.</li>
          <li>Úsalo para mímica, pictionary, adivinanzas, etc.</li>
          <li>¡Diviértete!</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
