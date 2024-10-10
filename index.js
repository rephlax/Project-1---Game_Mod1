// For the hammer to follow the cursor and animate on click
const hammer = document.getElementById('hammer');

// How I positioned the hammer relative to the cursor
const hammerOffsetX = 5;
const hammerOffsetY = -80;

// Follow the cursor
document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Position updating
    hammer.style.left = `${x + hammerOffsetX}px`;
    hammer.style.top = `${y + hammerOffsetY}px`;
});

// Animate on click (this and the reflow is forcing the animation removal on the hammer before adding it back)
document.addEventListener('click', () => {
    hammer.classList.remove('hammer-animation');
    
    // Trigger a reflow
    void hammer.offsetWidth;
    
    // Add the class to animate the hammer
    hammer.classList.add('hammer-animation');
});

// intro screen js
const startBtn = document.getElementById("start-button");
const introScreen = document.getElementById("intro-screen")
const gameScreen = document.getElementById("game-screen")

startBtn.addEventListener("click", () => {
    introScreen.style.display = "none";
    gameScreen.style.display = "flex";
});