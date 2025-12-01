# 🎮 Party Words

Juego de fiesta para adivinar palabras con un diseño gamer oscuro, legible y adaptado a móvil. Ideal para mímica, pictionary y adivinanzas con amigos y familia.

## ✨ Características
- Categorías: animales, profesiones y personajes.
- Generación de palabras aleatorias sin repetición hasta agotar lista.
- Temporizador opcional de 30s con estado de alerta ≤10s.
- Interfaz gamer: tipografías `Orbitron` y `Inter`, tema neon, responsive.

## 🚀 Uso rápido
```bash
npm install
npm start
```
Abre `http://localhost:3000/`.

## 🛠️ Scripts
- `npm start` inicia el servidor de desarrollo.
- `npm run build` genera la build de producción.
- `npm run deploy` publica en GitHub Pages.

Sitio publicado: `https://ahuertam.github.io/party-words`

## 📱 Diseño y Accesibilidad
- Paleta con alto contraste y botones grandes para dispositivos táctiles.
- Tipografías legibles y tamaños fluidos vía `clamp(...)`.
- Variables CSS para personalizar colores (`src/index.css`).

## 🧱 Estructura
```
src/
  App.js          # Layout principal y lógica
  App.css         # Estilos del tema gamer
  ListSelector.js # Selector de categorías
  ListSelector.css
  lists/          # Listas de palabras
```

## 📦 Tecnologías
- React (CRA), CSS moderno, GitHub Pages para despliegue.

## 🤝 Contribuir
PRs y sugerencias son bienvenidas. Ideas: más categorías, sonidos, barra de progreso del timer.

## 📄 Licencia
MIT.

## 🙌 Créditos
Fuentes: Orbitron y Inter vía Google Fonts.
