// Facade centraliza la lógica principal del juego
class GameFacade {
    constructor({ inputAdapter, scoreService }) {
        this.inputAdapter = inputAdapter;
        this.scoreService = scoreService;
        this.score = 0;
        this.isGameOver = false;
    }

    start() {
        // Inicializa el juego
        this.score = 0;
        this.isGameOver = false;
        // ...lógica para iniciar el juego...
    }

    restart() {
        // Reinicia el juego
        this.start();
    }

    saveScore() {
        this.scoreService.saveScore(this.score);
    }

    getTopScores() {
        return this.scoreService.getTopScores();
    }
}

export default GameFacade;
