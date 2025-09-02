// Adapter para entrada por teclado (implementa IInputAdapter)
import IInputAdapter from '../interfaces/IInputAdapter.js';

class KeyboardInputAdapter extends IInputAdapter {
    constructor(kaboomInstance) {
        super();
        this.k = kaboomInstance;
        this.input = { left: false, right: false, jump: false };
        this._setupListeners();
    }

    _setupListeners() {
    this.k.onKeyDown('left', () => { this.input.left = true; });
    this.k.onKeyRelease('left', () => { this.input.left = false; });
    this.k.onKeyDown('right', () => { this.input.right = true; });
    this.k.onKeyRelease('right', () => { this.input.right = false; });
    this.k.onKeyPress('space', () => { this.input.jump = true; });
    this.k.onKeyRelease('space', () => { this.input.jump = false; });
    }

    getInput() {
        return { ...this.input };
    }
}

export default KeyboardInputAdapter;
