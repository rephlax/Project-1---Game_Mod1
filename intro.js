export class Intro {
    constructor(onGameStart) {
        this.introScreen = document.getElementById("intro-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.nameInput = document.getElementById("name-input");
        this.holeCountInput = document.getElementById("hole-input");
        this.speedInput = document.getElementById("speed-input");
        this.formSubmitBtn = document.getElementById("form-submit-btn");
        this.formResetBtn = document.getElementById("form-reset-btn");
        this.startBtn = document.getElementById("start-button");
        this.onGameStart = onGameStart;
        
        this.formSubmitBtn.addEventListener("click", this.validateForm.bind(this));
        this.formResetBtn.addEventListener("click", this.resetForm.bind(this));
        this.startBtn.addEventListener("click", this.handleStartClick.bind(this));
    }

    validateForm(event) {
        event.preventDefault();
        if (this.checkFormValidity()) {
            this.startBtn.disabled = false;
        } else {
            this.startBtn.disabled = true;
        }
    }

    checkFormValidity() {
        if (!this.nameInput.value.trim()) {
            alert("Please enter your name.");
            return false;
        }
        const holeCount = parseInt(this.holeCountInput.value);
        if (isNaN(holeCount) || holeCount < 2 || holeCount > 10) {
            alert("Please enter a valid number of holes (2-10).");
            return false;
        }
        const speed = parseInt(this.speedInput.value);
        if (isNaN(speed) || speed < 100 || speed > 5000) {
            alert("Please enter a valid speed (100-5000ms).");
            return false;
        }
        return true;
    }

    resetForm() {
        this.nameInput.value = '';
        this.holeCountInput.value = '';
        this.speedInput.value = '';
        this.startBtn.disabled = true;
    }

    handleStartClick() {
        if (this.checkFormValidity()) {
            this.showGameScreen();
            this.onGameStart(this.getGameSettings());
        }
    }

    showGameScreen() {
        this.introScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
    }

    getGameSettings() {
        return {
            playerName: this.nameInput.value.trim(),
            holeCount: parseInt(this.holeCountInput.value),
            speed: parseInt(this.speedInput.value)
        };
    }
}