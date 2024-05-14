const EnemyController = require('../EnemyController/enemyController.js');
const gameController = require("../GameController/gameController.js");
const assert = require('assert').strict;

describe('GetNovelPosition', () => {
    
    it('it should not repeat positions', () => {
        const conn = new EnemyController();

        const seenPositions = [];
        for(let i = 0;i < 64;i++) {
            const pos = conn.GetNovelPosition();
            assert.ok(!seenPositions.some((prevPos) => gameController.PositionsMatch(prevPos, pos)));
            seenPositions.push(pos);
        }
    });
});