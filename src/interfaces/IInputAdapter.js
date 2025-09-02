// Interfaz para adaptadores de entrada (DIP)
class IInputAdapter {
    getInput() {
        throw new Error('Método getInput() debe ser implementado');
    }
}

export default IInputAdapter;
