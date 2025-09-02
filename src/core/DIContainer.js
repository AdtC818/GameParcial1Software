// Factoría simple para IoC
class DIContainer {
    constructor() {
        this.dependencies = {};
    }
    register(name, dependency) {
        this.dependencies[name] = dependency;
    }
    get(name) {
        if (!this.dependencies[name]) {
            throw new Error(`Dependencia ${name} no registrada`);
        }
        return this.dependencies[name];
    }
}

export default new DIContainer();
