const assert = require('assert').strict;
const gameController = require("../GameController/gameController.js");
const position = require("../GameController/position.js")
const ship = require("../GameController/ship");
const letters = require("../GameController/letters.js");

describe('isShipSunk', () => {
    it('should return false if the ship is not sunk', () => {
        const testShip = setupTestShip();
        assert.ok(!gameController.isShipSunk(testShip));
    });

    it('should return false if ship is hit but not sunk', () => {
        const testShip = setupTestShip();
        gameController.CheckIsHit([testShip], testShip.positions[1]);
        
        assert.ok(!gameController.isShipSunk(testShip));
    });

    it('should return true if the ship is sunk', () => {
        const testShip = setupTestShip();
        testShip.positions.forEach((pos) => gameController.CheckIsHit([testShip], pos));
        
        assert.ok(gameController.isShipSunk(testShip));
    });
});

function setupTestShip() {
    var testship = new ship("Battleship", 3, 0);
    testship.addPosition(new position(letters.A, 1));
    testship.addPosition(new position(letters.A, 2));
    testship.addPosition(new position(letters.A, 3));

    return testship;
}