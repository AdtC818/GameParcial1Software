// Interfaz para el servicio de puntajes (DIP)
class IScoreService {
    saveScore(score) {
        throw new Error('Método saveScore() debe ser implementado');
    }
    getTopScores() {
        throw new Error('Método getTopScores() debe ser implementado');
    }
}

export default IScoreService;
