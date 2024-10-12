export class Game {
    constructor(endGameCallback) {
        this.gameStartBtn = document.getElementById("start-game-button");
        this.moleHills = document.querySelectorAll(".mole-hill");
        this.cheatsCheckbox = document.getElementById("cheats");
        this.activeHoles = [];
        this.score = 0;
        this.gameInterval = null;
        this.endGameCallback = endGameCallback;

        this.gameStartBtn.addEventListener("click", this.startGame.bind(this));
    }

    startGame(settings) {
        this.resetGame();
        this.selectAndShowHoles(settings.holeCount);
        this.gameStartBtn.style.display = "none";
        this.startMoleAppearance(settings.speed);
    }

    resetGame() {
        this.score = 0;
        this.moleHills.forEach(hill => {
            hill.style.display = "none";
            hill.classList.remove("mole-up");
            hill.removeEventListener('click', this.hitMole);
        });
    }

    selectAndShowHoles(count) {
        const shuffled = Array.from(this.moleHills).sort(() => 0.5 - Math.random());
        this.activeHoles = shuffled.slice(0, count);
        this.activeHoles.forEach(hill => {
            hill.style.display = "block";
            hill.addEventListener('click', this.hitMole.bind(this));
        });
    }

    startMoleAppearance(speed) {
        this.gameInterval = setInterval(() => this.showRandomMole(), speed);
        setTimeout(() => this.endGame(), 60000); // End game after 60 seconds
    }

    showRandomMole() {
        const randomHole = this.activeHoles[Math.floor(Math.random() * this.activeHoles.length)];
        randomHole.classList.add('mole-up');
        setTimeout(() => randomHole.classList.remove('mole-up'), 800);
    }

    hitMole(event) {
       
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.endGameCallback(this.score);
    }
}