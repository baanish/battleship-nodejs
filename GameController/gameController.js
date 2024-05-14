const letters = require("../GameController/letters.js");
const position = require("../GameController/position.js");

const Letters = require("./letters")

class GameController {
    static InitializeShips() {
        var colors = require("cli-color");
        const Ship = require("./ship.js");
        var ships = [
            new Ship("Aircraft Carrier", 5, colors.CadetBlue),
            new Ship("Battleship", 4, colors.Red),
            new Ship("Submarine", 3, colors.Chartreuse),
            new Ship("Destroyer", 3, colors.Yellow),
            new Ship("Patrol Boat", 2, colors.Orange)
        ];
        return ships;
    }

    static CheckIsHit(ships, shot) {
        if (shot == undefined)
            throw "The shooting position is not defined";
        if (ships == undefined)
            throw "No ships defined";
        var returnvalue = false;
        ships.forEach(function (ship) {
            ship.positions.forEach(position => {
                if (position.row == shot.row && position.column == shot.column) {
                    returnvalue = true;
                    position.isHit = true;
                }
            });
        });
        return returnvalue;
    }

    static isPositionValid(position) {
        return Object.values(Letters).includes(position.column) && position.row < 9;
    }

    static PositionsMatch(pos1, pos2) {
        return pos1.row == pos2.row && pos1.column == pos2.column;
    }

    static isShipValid(ship) {
        return ship.positions.length == ship.size;
    }

    static isShipSunk(ship) {
        return ship.positions.every((pos) => pos.isHit);
    }

    static GameOverCheck(ships) {
        return ships.length === 0;
    }

    static GetRandomPosition() {
        var rows = 8;
        var lines = 8;
        var rndColumn = Math.floor((Math.random() * lines));
        var letter = letters.get(rndColumn + 1);
        var number = Math.floor((Math.random() * rows));
        var result = new position(letter, number);
        return result;
    }
}

module.exports = GameController;
