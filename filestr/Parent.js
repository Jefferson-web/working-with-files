const Nodo = require('./Nodo');

class Parent extends Nodo {

    constructor(name) {
        super(name);
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

}

module.exports = Parent;