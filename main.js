import { followCursor, animateHammer } from './hammer.js';
import { Intro } from './intro.js';
import { Game } from './game.js';
import { Ending } from './ending.js';

class Main {
    constructor() {
        this.ending = new Ending();
        this.game = new Game(this.endGame.bind(this));
        this.intro = new Intro(this.startGame.bind(this));

        // FOr the hammer to work
        document.addEventListener('mousemove', followCursor);
        document.addEventListener('click', animateHammer);
    }

    startGame(settings) {
        console.log("Starting game with settings:", settings);
        this.game.startGame(settings);
    }

    endGame(score) {
        const settings = this.intro.getGameSettings();
        this.ending.showEndScreen(score, settings.playerName);
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Main();
    console.log("Game init");
});