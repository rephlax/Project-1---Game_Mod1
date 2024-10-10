// For the hammer to follow the cursor
const hammer = document.getElementById('hammer');
document.addEventListener('mousemove', (event) => {
    const x = event.clientX; // Mouse x
    const y = event.clientY; // Mouse y

    // Position updating
    hammer.style.left = `${x}px`;
    hammer.style.top = `${y}px`;
});

// intro screen js
const startBtn = document.getElementById("start-button");
const introScreen = document.getElementById("intro-screen")
const gameScreen = document.getElementById("game-screen")

startBtn.addEventListener("click", () => {
    introScreen.style.display = "none";
    gameScreen.style.display = "flex";
});