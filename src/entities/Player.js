// Entidad Player (SRP)
class Player {
    constructor({ position, sprite }) {
        this.position = position;
        this.sprite = sprite;
        this.isJumping = false;
    }

    move(direction) {
        // Lógica de movimiento
        this.position.x += direction.x;
        this.position.y += direction.y;
    }

    jump() {
        // Lógica de salto
        this.isJumping = true;
    }
}

export default Player;
