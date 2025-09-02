// Entidad Coin (SRP)
class Coin {
    constructor({ position, sprite }) {
        this.position = position;
        this.sprite = sprite;
        this.collected = false;
    }

    collect() {
        this.collected = true;
    }
}

export default Coin;
