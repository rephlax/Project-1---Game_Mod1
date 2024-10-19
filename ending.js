export class Ending {
    constructor() {
        this.endingScreen = document.getElementById("ending-screen");
        this.introScreen = document.getElementById("intro-screen");
        this.nameDisplay = document.querySelectorAll("#name-display");
        this.scoreCount = document.querySelectorAll("#score-count");
        this.gameScreen = document.querySelector("#game-screen");
        this.restartButton = document.getElementById("restart-button");

        this.restartButton.addEventListener("click", this.handleRestartClick.bind(this));
    }

    showEndScreen(finalScore, playerName) {
        this.endingScreen.style.display = "flex";
        this.gameScreen.style.display = "none";
        this.nameDisplay.forEach(display => display.textContent = playerName);
        this.scoreCount.forEach(display => display.textContent = `Score: ${finalScore}`);
    }

    handleRestartClick() {
        this.hideEndScreen(); //Its empty to allow for more to be added in the future.
    }

    hideEndScreen() {
        this.endingScreen.style.display = "none";
        this.introScreen.style.display = "flex"
    }
}