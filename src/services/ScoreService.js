// Servicio de puntajes (implementa IScoreService)
import IScoreService from '../interfaces/IScoreService.js';

class ScoreService extends IScoreService {
    constructor() {
        super();
        this.scores = [];
    }

    saveScore(score) {
        this.scores.push(score);
        this.scores.sort((a, b) => b - a);
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }
        // Aquí se podría guardar en un archivo JSON
    }

    getTopScores() {
        // Aquí se podría leer de un archivo JSON
        return this.scores;
    }
}

export default ScoreService;
