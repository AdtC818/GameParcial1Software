// Entidad Obstacle (SRP)
class Obstacle {
    constructor({ position, sprite }) {
        this.position = position;
        this.sprite = sprite;
    }

    update() {
        // Lógica para mover el obstáculo
        this.position.x -= 2; // ejemplo: se mueve a la izquierda
    }
}

export default Obstacle;
