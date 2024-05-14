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
}