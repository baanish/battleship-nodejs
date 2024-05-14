const gameController = require("../GameController/gameController.js");

module.exports = class EnemyController {

    constructor() {
        this.fleet = [];
        this.attemptedShots = [];
    }

    AttemptShot(opposingFleet) {
        let attempt;
        do {
            attempt = gameController.GetRandomPosition();
        } while(this.WasAttempted(attempt));

        this.attemptedShots.push(attempt);
        return gameController.CheckIsHit(opposingFleet, attempt);
    }

    WasAttempted(attempt) {
        return this.attemptedShots.some((pos) => gameController.PositionsMatch(pos, attempt));
    }

    InitializeEnemyFleet() {
        this.fleet = gameController.InitializeShips();

        this.fleet[0].addPosition(new position(letters.B, 4));
        this.fleet[0].addPosition(new position(letters.B, 5));
        this.fleet[0].addPosition(new position(letters.B, 6));
        this.fleet[0].addPosition(new position(letters.B, 7));
        this.fleet[0].addPosition(new position(letters.B, 8));

        this.fleet[1].addPosition(new position(letters.E, 6));
        this.fleet[1].addPosition(new position(letters.E, 7));
        this.fleet[1].addPosition(new position(letters.E, 8));
        this.fleet[1].addPosition(new position(letters.E, 9));

        this.fleet[2].addPosition(new position(letters.A, 3));
        this.fleet[2].addPosition(new position(letters.B, 3));
        this.fleet[2].addPosition(new position(letters.C, 3));

        this.fleet[3].addPosition(new position(letters.F, 8));
        this.fleet[3].addPosition(new position(letters.G, 8));
        this.fleet[3].addPosition(new position(letters.H, 8));

        this.fleet[4].addPosition(new position(letters.C, 5));
        this.fleet[4].addPosition(new position(letters.C, 6));
    }
}