export class Intro {
    constructor(onGameStart) {
        this.introScreen = document.getElementById("intro-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.nameForm = document.getElementById("name-form");
        this.nameInput = document.getElementById("name-input");
        this.holeCountInput = document.getElementById("hole-input");
        this.speedInput = document.getElementById("speed-input");
        this.formSubmitBtn = document.getElementById("form-submit-btn");
        this.formResetBtn = document.getElementById("form-reset-btn");
        this.startBtn = document.getElementById("start-button");
        this.onGameStart = onGameStart;
        
        this.nameForm.addEventListener("submit", this.handleFormSubmit.bind(this));
        this.formResetBtn.addEventListener("click", this.resetForm.bind(this));
        this.startBtn.addEventListener("click", this.handleStartClick.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        alert("Your settings have been submitted!")
    }

    // To enforce the reset button action
    resetForm() {
        this.nameInput.value = '';
        this.holeCountInput.value = '';
        this.speedInput.value = '';
    }

    handleStartClick() {
            this.showGameScreen();
            this.onGameStart(this.getGameSettings());
    }

    showGameScreen() {
        this.introScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
    }

    // Allows people to click start without submitting the start settings form.
    getGameSettings() {
        const defaultHoleCount = 6;
        const defaultSpeed = 1000;

        return {
            playerName: this.nameInput.value.trim() || "Player",
            holeCount: parseInt(this.holeCountInput.value) || defaultHoleCount,
            speed: parseInt(this.speedInput.value) || defaultSpeed
        };
    }
}