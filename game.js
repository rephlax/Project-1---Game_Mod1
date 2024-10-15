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
        this.playerName = "Player";
    }

    startGame(settings) {
        this.resetGame();
        this.selectAndShowHoles(settings.holeCount);
        this.playerName = settings.playerName || "Player";
        this.updateScoreDisplay();
        this.updatePlayerName(settings.playerName);
        const speed = settings.speed;
        this.startMoleAppearance(speed);
    }

    resetGame() {
        this.score = 0;
        this.updateScoreDisplay();
        this.updatePlayerName();
        this.moleHills.forEach(hill => {
            hill.style.display = "none";
            hill.classList.remove("mole-up");
            const mole = hill.querySelector('.mole');
            if (mole) {
                mole.classList.remove('hit');
                mole.style.display = 'none';
            }
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
        this.gameInterval = setInterval(() => this.showRandomMole(speed), speed);
        setTimeout(() => this.endGame(), 120000);
    }

    showRandomMole(speed) {
        const availableHoles = this.activeHoles.filter(hole => !this.animatingHoles.has(hole));
        if (availableHoles.length === 0) return;

        const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
        const moleImage = randomHole.querySelector('.mole');
        
        this.animatingHoles.add(randomHole);
        
        const keyframes = [
          { transform: 'translate(-50%, 100%)', offset: 0 },
          { transform: 'translate(-50%, -20px)', offset: 0.2 },
          { transform: 'translate(-50%, -20px)', offset: 0.8 },
          { transform: 'translate(-50%, 100%)', offset: 1 }
        ];
        
        const options = {
          duration: speed,
          easing: 'ease-in-out',
          fill: 'forwards'
        };
        
        moleImage.style.display = 'block';
        moleImage.classList.add('mole-up');
        const animation = moleImage.animate(keyframes, options);
        
        // done so the mole will not pop up on the same hole (while the previous animation is going still) causing a weird animation.
        animation.onfinish = () => {
          setTimeout(() => {
            moleImage.style.display = 'none';
            moleImage.classList.remove('mole-up');
            this.animatingHoles.delete(randomHole);
          }, 200);
        };
    }

    hitMole(event) {
        const moleImage = event.target.closest('.mole');
        if (moleImage && moleImage.classList.contains('mole-up') && !moleImage.classList.contains('hit')) {
            moleImage.classList.add('hit');
            moleImage.classList.remove('mole-up');
            this.score++;
            this.updateScoreDisplay();

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
                moleImage.style.display = 'none';
                moleImage.classList.remove('hit');
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

    endGame() {
        clearInterval(this.gameInterval);
        this.endGameCallback(this.score);
    }
}