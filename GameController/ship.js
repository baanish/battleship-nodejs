const position = require("./position.js");
const letters = require("./letters.js");
const Directions = require('./cardinalDirection.js');

class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }

    setPosition(startPos, direction) {
        this.positions.push(startPos);
        switch(direction) {
            case Directions.N: return this.northPositions(startPos);
            case Directions.S: return this.southPositions(startPos);
            case Directions.E: return this.eastPositions(startPos);
            case Directions.W: return this.westPositions(startPos);
        }
    }

    addPosition(position) {
        this.positions.push(position);
    }

    northPositions(startPos) {
        for(let i = 1;i < this.size;i++) {
            const column = letters.get(startPos.column - i);
            this.positions.push(new position(column, startPos.row))
        }
    }

    southPositions(startPos) {
        for(let i = 1;i < this.size;i++) {
            const column = letters.get(startPos.column + i);
            this.positions.push(new position(column, startPos.row))
        }
    }

    eastPositions(startPos) {
        for(let i = 1;i < this.size;i++) {
            const row = startPos.row + i;
            this.positions.push(new position(startPos.column, row))
        }
    }

    westPositions(startPos) {
        for(let i = 1;i < this.size;i++) {
            const row = startPos.row - i;
            this.positions.push(new position(startPos.column, row))
        }
    }
}

module.exports = Ship;