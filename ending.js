export class Ending {
    constructor(restartCallback) {
        this.endingScreen = document.getElementById("ending-screen");
        this.introScreen = document.getElementById("intro-screen");
        this.nameDisplay = document.querySelectorAll("#name-display");
        this.scoreCount = document.querySelectorAll("#score-count");
        this.gameScreen = document.querySelector("#game-screen");
        this.restartButton = document.getElementById("restart-button");

        this.restartCallback = restartCallback;
        this.restartButton.addEventListener("click", this.handleRestartClick.bind(this));
    }

    showEndScreen(finalScore, playerName) {
        this.endingScreen.style.display = "flex";
        this.gameScreen.style.display = "none";
        this.nameDisplay.forEach(display => display.textContent = playerName);
        this.scoreCount.forEach(display => display.textContent = `Score: ${finalScore}`);
    }

    handleRestartClick() {
        this.hideEndScreen();
        if (this.restartCallback) {
            this.restartCallback();
        }
    }

    hideEndScreen() {
        this.endingScreen.style.display = "none";
        this.introScreen.style.display = "flex"
    }
}