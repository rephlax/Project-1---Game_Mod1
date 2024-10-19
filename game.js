export class Game {
    constructor(endGameCallback) {
        this.gameStartBtn = document.getElementById("start-game-button");
        this.moleHills = document.querySelectorAll(".mole-hill");
        this.cheatsCheckbox = document.getElementById("cheats");
        this.scoreDisplay = document.getElementById("score-display");
        this.playerDisplay = document.getElementById("player-name")
        this.activeHoles = [];
        this.animatingHoles = new Set();
        this.score = 0;
        this.gameInterval = null;
        this.endGameCallback = endGameCallback;
        this.playerName = "PLAYER";

        // volume slider constructor
        this.hammerSound = document.getElementById("hammer-sound");
        this.moleHitSound = document.getElementById("mole-hit-sound");
        this.volumeSlider = document.getElementById("volume-slider");
        this.gameMusic = document.getElementById("game-music");

        this.volumeSlider.addEventListener("input", this.updateVolume.bind(this));
        this.updateVolume(); 

        document.addEventListener("click", this.playHammerSound.bind(this));

        this.cheatsCheckbox = document.getElementById("cheats");
        this.cheatsCheckbox.addEventListener("change", this.toggleCheats.bind(this));
        this.cheatsActive = false;

        // to stop the click and drag from happening
        this.preventDrag = this.preventDrag.bind(this);
        document.addEventListener("dragstart", this.preventDrag);
    }

    startGame(settings) {
        this.resetGame();
        this.selectAndShowHoles(settings.holeCount);
        this.playerName = settings.playerName.toUpperCase() || "PLAYER";
        this.updateScoreDisplay();
        this.updatePlayerName(settings.playerName);
        const speed = settings.speed;
        this.startMoleAppearance(speed);

        this.cheatsActive = this.cheatsCheckbox.checked;
        this.updateMoleStyles();

        this.fadeInGameMusic();
    }

    fadeInGameMusic() {
        this.gameMusic.volume = 0;
        this.gameMusic.play();
        
        let volume = 0;
        const fadeInInterval = setInterval(() => {
            if (volume < this.volumeSlider.value) {
                volume += 0.05;
                this.gameMusic.volume = volume;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 1000);
    }

    toggleCheats() {
        this.cheatsActive = this.cheatsCheckbox.checked;
        this.updateMoleStyles();
    }

    updateMoleStyles() {
        const moles = document.querySelectorAll('.mole');
        moles.forEach(mole => {
            if (this.cheatsActive) {
                mole.style.width = "75%";
            } else {
                mole.style.width = "40%"
            }
        });
    }

    resetGame() {
        this.score = 0;
        this.updateScoreDisplay();
        this.updatePlayerName();
        this.moleHills.forEach(hill => {
            hill.style.display = "none";
            hill.classList.remove("mole-up");
            const mole = hill.querySelector(".mole");
            if (mole) {
                mole.classList.remove("hit");
                mole.style.display = "none";
            }
            hill.removeEventListener("click", this.hitMole);
        });
    }

    selectAndShowHoles(count) {
        this.activeHoles = Array.from(this.moleHills).slice(0, count);
        this.activeHoles.forEach(hill => {
            hill.style.display = "block";
            hill.addEventListener("click", this.hitMole.bind(this));
        });
    }

    startMoleAppearance(speed) {
        this.gameInterval = setInterval(() => this.showRandomMole(speed), speed);
        setTimeout(() => this.endGame(), 120000);
    }

        // Taking the number of hole available, picks a random hole, gives the animation.
    showRandomMole(speed) {
        const availableHoles = this.activeHoles.filter(hole => !this.animatingHoles.has(hole));
        if (availableHoles.length === 0) return;

        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        const moleImage = randomHole.querySelector(".mole");
        
        this.animatingHoles.add(randomHole);
        
        const keyframes = [
          { transform: 'translate(-50%, 100%)', offset: 0 },
          { transform: 'translate(-50%, -20px)', offset: 0.2 },
          { transform: 'translate(-50%, -20px)', offset: 0.8 },
          { transform: 'translate(-50%, 100%)', offset: 1 }
        ];
        
        const options = {
          duration: this.cheatsActive ? speed * 1.5 : speed,
          easing: 'ease-in-out',
          fill: 'forwards'
        };
        
        moleImage.style.display = "block";
        moleImage.classList.add("mole-up");
        const animation = moleImage.animate(keyframes, options);
        
        // done so the mole will not pop up on the same hole (while the previous animation is going still) causing a weird animation.
        animation.onfinish = () => {
          setTimeout(() => {
            moleImage.style.display = "none";
            moleImage.classList.remove("mole-up");
            this.animatingHoles.delete(randomHole);
          }, 200);
        };
    }

    hitMole(event) {
        const moleImage = event.target.closest(".mole");
        if (moleImage && moleImage.classList.contains("mole-up") && !moleImage.classList.contains('hit')) {
            moleImage.classList.add("hit");
            moleImage.classList.remove("mole-up");
            this.score++;
            this.updateScoreDisplay();
            this.playMoleHitSound();

            const spinKeyframes = [
                { transform: 'translate(-50%, -20px) rotate(0deg)' },
                { transform: 'translate(-50%, 100%) rotate(360deg)' }
            ];

            const spinOptions = {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards'
            };

            moleImage.animate(spinKeyframes, spinOptions).onfinish = () => {
                moleImage.style.display = "none";
                moleImage.classList.remove("hit");
            };
        }
    }

    updateScoreDisplay() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = `Score: ${this.score}`;
        }
    }

    updatePlayerName() {
        if (this.playerDisplay) {
            this.playerDisplay.textContent = `${this.playerName}`;
        }
    }

    preventDrag(event) {
        if (event.target.classList.contains("mole")) {
            event.preventDefault();
        }
    }

    updateVolume() {
        const volume = this.volumeSlider.value;
        this.hammerSound.volume = volume;
        this.moleHitSound.volume = volume;
        this.gameMusic.volume = volume;
    }

    playHammerSound() {
        this.hammerSound.currentTime = 0; // Play from the start
        this.hammerSound.play();
    }

    playMoleHitSound() {
        this.moleHitSound.currentTime = 0.5; //sound is delayed here
        this.moleHitSound.play();
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.fadeOutGameMusic(() => {
            this.endGameCallback(this.score);
        });
        document.removeEventListener("dragstart", this.preventDrag);
    }

    fadeOutGameMusic(callback) {
        let volume = this.gameMusic.volume;
        const fadeOutInterval = setInterval(() => {
            if (volume < this.volumeSlider.value) {
                volume -= 0.05;
                this.gameMusic.volume = volume;
            } else {
                clearInterval(fadeOutInterval);
                this.gameMusic.pause();
                this.gameMusic.currentTime = 0;
                callback();
            }
        }, 100);
    }
}