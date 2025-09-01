// Ya no necesitamos importar, la función "kaboom" ya existe globalmente.

// Inicializa el contexto del juego
const k = kaboom({
    fullscreen: true,
    scale: 1,
    debug: true,
    background: [0, 0, 0],
});

// Define una escena principal
k.scene("main", () => {
    k.add([
        k.text("¡El juego está funcionando!"),
        k.pos(k.width() / 2, k.height() / 2),
        // Esta es la línea corregida:
        k.anchor("center"),
    ]);
});

// Inicia el juego yendo a la escena "main"
k.go("main");