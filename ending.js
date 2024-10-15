export class Ending {
    constructor() {
        this.endingScreen = document.getElementById("ending-screen");
        this.nameDisplay = document.querySelectorAll("#name-display");
        this.scoreCount = document.querySelectorAll("#score-count");
        this.gameScreen = document.querySelector("#game-screen")
    }

    showEndScreen(finalScore, playerName) {
        this.endingScreen.style.display = "flex";
        this.gameScreen.style.display = "none";
        this.nameDisplay.forEach(display => display.textContent = playerName);
        this.scoreCount.forEach(display => display.textContent = `Score: ${finalScore}`);
    }

    hideEndScreen() {
        this.endingScreen.style.display = "none";
    }
}