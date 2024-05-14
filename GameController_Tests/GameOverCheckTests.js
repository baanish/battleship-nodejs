const assert = require('assert').strict;
const gameController = require("../GameController/gameController.js");
const setupTestShips = require('./utils.js');

describe('GameOverCheck', () => {
    
    it('should return false if ships remain', () => {
        const ships = setupTestShips();
        const gameOver = gameController.GameOverCheck(ships);
        assert.ok(!gameOver);
    });

    it('should return true if no ships remain', () => {
        const gameOver = gameController.GameOverCheck([]);
        assert.ok(gameOver);
    });
});