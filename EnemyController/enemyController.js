const gameController = require("../GameController/gameController.js");
const position = require("../GameController/position.js");
const letters = require("../GameController/letters.js");

module.exports = class EnemyController {

    constructor() {
        this.fleet = InitializeEnemyFleet();
        this.attemptedShots = [];
    }

    GetNovelPosition() {
        let attempt;
        do {
            attempt = gameController.GetRandomPosition();
        } while(this.WasAttempted(attempt));

        this.attemptedShots.push(attempt);

        return attempt;
    }

    AttemptShot(opposingFleet) {
        let attempt = this.GetNovelPosition();
        const isHit = gameController.CheckIsHit(opposingFleet, attempt);

        console.log(`Computer shot in ${attempt.column}${attempt.row} and ` + (isHit ? `has hit your ship !` : `miss`));

        return isHit;
    }

    WasAttempted(attempt) {
        return this.attemptedShots.some((pos) => gameController.PositionsMatch(pos, attempt));
    }
}

function InitializeEnemyFleet() {
    const fleet = gameController.InitializeShips();

    fleet[0].addPosition(new position(letters.B, 4));
    fleet[0].addPosition(new position(letters.B, 5));
    fleet[0].addPosition(new position(letters.B, 6));
    fleet[0].addPosition(new position(letters.B, 7));
    fleet[0].addPosition(new position(letters.B, 8));

    fleet[1].addPosition(new position(letters.E, 6));
    fleet[1].addPosition(new position(letters.E, 7));
    fleet[1].addPosition(new position(letters.E, 8));
    fleet[1].addPosition(new position(letters.E, 9));

    fleet[2].addPosition(new position(letters.A, 3));
    fleet[2].addPosition(new position(letters.B, 3));
    fleet[2].addPosition(new position(letters.C, 3));

    fleet[3].addPosition(new position(letters.F, 8));
    fleet[3].addPosition(new position(letters.G, 8));
    fleet[3].addPosition(new position(letters.H, 8));

    fleet[4].addPosition(new position(letters.C, 5));
    fleet[4].addPosition(new position(letters.C, 6));

    return fleet;
}