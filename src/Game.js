// Inicializa Kaboom
const k = kaboom({
    fullscreen: true,
    scale: 1,
    debug: true,
    background: [200, 200, 200], // gris claro para mejor visibilidad
});

// Listener global para depuración de teclado
window.addEventListener('keydown', (e) => {
    console.log('Global keydown:', e.key);
});

// --- Clases ---
class Player {
    constructor({ position, sprite }) {
        this.position = position;
        this.sprite = sprite;
        this.isJumping = false;
    }
    move(direction) {
        this.position.x += direction.x;
        this.position.y += direction.y;
    }
    jump() {
        this.isJumping = true;
    }
}

class Obstacle {
    constructor({ position, sprite }) {
        this.position = position;
        this.sprite = sprite;
    }
    update() {
        this.position.x -= 2;
    }
}

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

class ScoreService {
    constructor() {
        this.scores = [];
    }
    saveScore(score) {
        this.scores.push(score);
        this.scores.sort((a, b) => b - a);
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }
    }
    getTopScores() {
        return this.scores;
    }
}

class KeyboardInputAdapter {
    constructor(kaboomInstance) {
        this.k = kaboomInstance;
        this.input = { left: false, right: false, jump: false };
        this._setupListeners();
    }
    _setupListeners() {
        this.k.onKeyDown('left', () => { console.log('Izquierda'); this.input.left = true; });
        this.k.onKeyRelease('left', () => { console.log('Izquierda OFF'); this.input.left = false; });
        this.k.onKeyDown('right', () => { console.log('Derecha'); this.input.right = true; });
        this.k.onKeyRelease('right', () => { console.log('Derecha OFF'); this.input.right = false; });
        this.k.onKeyPress('space', () => { console.log('Salto'); this.input.jump = true; });
        this.k.onKeyRelease('space', () => { console.log('Salto OFF'); this.input.jump = false; });
    }
    getInput() {
        return { ...this.input };
    }
}

class GameFacade {
    constructor({ inputAdapter, scoreService }) {
        this.inputAdapter = inputAdapter;
        this.scoreService = scoreService;
        this.score = 0;
        this.isGameOver = false;
    }
    start() {
        this.score = 0;
        this.isGameOver = false;
    }
    restart() {
        this.start();
    }
    saveScore() {
        this.scoreService.saveScore(this.score);
    }
    getTopScores() {
        return this.scoreService.getTopScores();
    }
}

// --- Lógica principal ---
Promise.all([
    k.loadSprite('player', 'assets/player.png'),
    k.loadSprite('coin', 'assets/coin.gif')
]).then(() => {
    const scoreService = new ScoreService();
    const game = new GameFacade({ inputAdapter: null, scoreService });

    let player;
    let obstacles = [];
    let coins = [];

    k.scene('main', () => {
        // Crear el adaptador de teclado dentro de la escena
        const inputAdapter = new KeyboardInputAdapter(k);
        game.inputAdapter = inputAdapter;

        player = new Player({ position: { x: 100, y: 100 }, sprite: 'player' });
        const playerObj = k.add([
            k.sprite('player'),
            k.pos(player.position.x, player.position.y),
            k.scale(0.5), // Escalar el jugador
            k.area(),
            k.body(),
        ]);

        function spawnObstacle() {
            const obstacle = new Obstacle({ position: { x: k.width() - 50, y: 120 }, sprite: 'obstacle' });
            obstacles.push(obstacle);
            k.add([
                k.rect(32, 32),
                k.color(255, 0, 0),
                k.pos(obstacle.position.x, obstacle.position.y),
                k.area(),
                'obstacle',
            ]);
        }

        function spawnCoin() {
            const coin = new Coin({ position: { x: k.width() - 50, y: 200 }, sprite: 'coin' });
            coins.push(coin);
            k.add([
                k.sprite('coin'),
                k.pos(coin.position.x, coin.position.y),
                k.area(),
                'coin',
            ]);
        }

        k.loop(1.5, spawnObstacle);
        k.loop(2.5, spawnCoin);

        k.onUpdate(() => {
            const input = game.inputAdapter.getInput();
            if (input.left) player.move({ x: -2, y: 0 });
            if (input.right) player.move({ x: 2, y: 0 });
            if (input.jump && !player.isJumping) {
                player.jump();
                playerObj.jump(400);
            }
            playerObj.pos.x = player.position.x;
            playerObj.pos.y = player.position.y;
        });

        playerObj.onCollide('obstacle', () => {
            game.isGameOver = true;
            k.go('gameover');
        });
        playerObj.onCollide('coin', (c) => {
            game.score += 10;
            c.destroy();
        });
    });

    k.scene('gameover', () => {
        game.saveScore();
        k.add([
            k.text('Game Over\nPuntaje: ' + game.score + '\nPresiona R para reiniciar', { size: 32 }),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
        ]);
        k.keyPress('r', () => {
            game.restart();
            k.go('main');
        });
        const topScores = game.getTopScores();
        k.add([
            k.text('Top 10: ' + topScores.join(', '), { size: 18 }),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.anchor('center'),
        ]);
    });

    k.go('main');
});