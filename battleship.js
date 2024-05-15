const { Worker, isMainThread } = require('worker_threads');
const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const Directions = require('./GameController/cardinalDirection.js');
const EnemyController = require('./EnemyController/enemyController.js');

let telemetryWorker;

class Battleship {
    start() {
        telemetryWorker = new Worker("./TelemetryClient/telemetryClient.js");

        console.log("Starting...");
        telemetryWorker.postMessage({eventName: 'ApplicationStarted', properties:  {Technology: 'Node.js'}});

        console.log(cliColor.xterm(8)("                                     |__"));
        console.log(cliColor.xterm(8)("                                     |\\/"));
        console.log(cliColor.xterm(8)("                                     ---"));
        console.log(cliColor.xterm(8)("                                     / | ["));
        console.log(cliColor.xterm(8)("                              !      | |||"));
        console.log(cliColor.xterm(8)("                            _/|     _/|-++'"));
        console.log(cliColor.xterm(8)("                        +  +--|    |--|--|_ |-"));
        console.log(cliColor.xterm(8)("                     { /|__|  |/\\__|  |--- |||__/"));
        console.log(cliColor.xterm(8)("                    +---------------___[}-_===_.'____                 /\\"));
        console.log(cliColor.xterm(8)("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
        console.log(cliColor.xterm(8)(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
        console.log(cliColor.xterm(8)("|                        Welcome to Battleship                         BB-61/"));
        console.log(cliColor.xterm(8)(" \\_________________________________________________________________________|"));
        console.log();

        this.InitializeGame();
        this.StartGame();
    }

    StartGame() {
        const enemyController = new EnemyController();

        console.clear();
        console.log("                  __");
        console.log("                 /  \\");
        console.log("           .-.  |    |");
        console.log("   *    _.-'  \\  \\__/");
        console.log("    \\.-'       \\");
        console.log("   /          _/");
        console.log("  |      _  /");
        console.log("  |     /_\\'");
        console.log("   \\    \\_/");
        console.log("    \"\"\"\"");

        do {
            console.log();
            console.log("Player, it's your turn");
            console.log("Enter coordinates for your shot :");

            var position = Battleship.ParsePosition(readline.question());
            while(!gameController.isPositionValid(position)) {
                console.log(cliColor.red("Invalid position entered!"));
                console.log("Enter coordinates for your shot :");
                position = Battleship.ParsePosition(readline.question());
            }
            var isHit = gameController.CheckIsHit(this.enemyFleet, position);

            telemetryWorker.postMessage({eventName: 'Player_ShootPosition', properties:  {Position: position.toString(), IsHit: isHit}});

            if (isHit) {
                beep();

                console.log("                \\         .  ./");
                console.log("              \\      .:\";'.:..\"   /");
                console.log("                  (M^^.^~~:.'\").");
                console.log("            -   (/  .    . . \\ \\)  -");
                console.log("               ((| :. ~ ^  :. .|))");
                console.log("            -   (\\- |  \\ /  |  /)  -");
                console.log("                 -\\  \\     /  /-");
                console.log("                   \\  \\   /  /");

                const wasShipSunk = this.SunkShipCheck(this.enemyFleet);
                if(wasShipSunk) {
                    console.log("One of your enemy's ships was sunk!");
                    this.PrintShipsRemaining(this.enemyFleet);
                }
            }

            console.log(isHit ? "Yeah ! Nice hit !" : "Miss");

            if(gameController.GameOverCheck(this.enemyFleet)) {
                console.log('You are the winner!')
                break;
            }

            // Computer Turn
            var isHit = enemyController.AttemptShot(this.myFleet);

            console.log();

            if (isHit) {
                beep();

                console.log("                \\         .  ./");
                console.log("              \\      .:\";'.:..\"   /");
                console.log("                  (M^^.^~~:.'\").");
                console.log("            -   (/  .    . . \\ \\)  -");
                console.log("               ((| :. ~ ^  :. .|))");
                console.log("            -   (\\- |  \\ /  |  /)  -");
                console.log("                 -\\  \\     /  /-");
                console.log("                   \\  \\   /  /");

                const wasShipSunk = this.SunkShipCheck(this.myFleet);
                if(wasShipSunk) {
                    console.log("One of your ships was sunk!");
                    this.PrintShipsRemaining(this.myFleet);
                }
            }

            if(gameController.GameOverCheck(this.myFleet)) {
                console.log('You lost!')
                break;
            }
        }
        while (true);
    }

    static ParsePosition(input) {
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1), 10);
        return new position(letter, number);
    }

    SunkShipCheck(ships) {
        const sunkShipIndex = ships.findIndex((ship) => gameController.isShipSunk(ship));
        const shipWasSunk = sunkShipIndex >= 0;
        if(shipWasSunk) ships.splice(sunkShipIndex, 1);

        return shipWasSunk;
    }

    PrintShipsRemaining(ships) {
        const remainingShips = ships.map((ship) => ship.name);
        console.log(`Ships remaining: ${remainingShips.join(', ')}`);
    }

    GetRandomPosition() {
        var rows = 8;
        var lines = 8;
        var rndColumn = Math.floor((Math.random() * lines));
        var letter = letters.get(rndColumn + 1);
        var number = Math.floor((Math.random() * rows));
        var result = new position(letter, number);
        return result;
    }

    InitializeGame() {
        this.InitializeMyFleet();
        this.InitializeEnemyFleet();
    }

    InitializeMyFleet() {
        const myFleet = gameController.InitializeShips();

        console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

        myFleet.forEach(function (ship) {
            console.log();

            let isValid;
            do {
                Battleship.InitialzeShip(ship);
                isValid = gameController.isValidShipPosition(ship, myFleet);
                if(!isValid) {
                    ship.positions = [];
                    console.log(`The position of your ${ship.name} is invalid. Please try again`);
                }
            } while(!isValid);

            console.log(`${ship.name} covers positions`, ship.positions.map((pos) => pos.toString()).join(', '));
        })

        this.myFleet = myFleet;
    }

    static InitialzeShip(ship) {
        var pos;
        var isValid;
        console.log(`Please enter the starting position for the ${ship.name}`);
        do {
            pos = Battleship.ParsePosition(readline.question());
            isValid = gameController.isPositionValid(pos);
            if(!isValid) console.log(`${pos} is an invalid position. Please try again`);
        } while(!isValid);

        let direction;
        do {
            console.log(`Please enter a direction for ${ship.name}`);
            direction = Directions.get(readline.question().toUpperCase());
            if(!direction) console.log('Direction is not valid. Valid options are "N", "S", "E", "W"');
        } while(!direction);

        ship.setPosition(pos, direction);
    }

    InitializeEnemyFleet() {
        this.enemyFleet = gameController.InitializeShips();

        // this.enemyFleet.forEach(ship => {
        //     const anchorPoint = this.GetRandomPosition();
        //     const shipSize = ship.size;
        //     const availableSpacesRight = 8 - anchorPoint.column.value;

        //     if (availableSpacesRight >= shipSize -1) {
        //         const anchorVal = anchorPoint.column.value;

        //         for (let i = anchorVal; i < shipSize + anchorVal; i++) {
        //             ship.addPosition(new position(letters[anchorPoint.column.key], i));
        //         }

        //         return;
        //     }

        //     for (let i = anchorPoint.column.value; i < shipSize + anchorPoint.column.value; i--) {
        //         return ship.addPosition(new position(letters[anchorPoint.column.key], i));
        //     }

        //     return;
        // });

        // console.log(this.enemyFleet);

        // LEAVING FOR FUTURE SHOOTING TESTS
        this.enemyFleet[0].addPosition(new position(letters.B, 4));
        this.enemyFleet[0].addPosition(new position(letters.B, 5));
        this.enemyFleet[0].addPosition(new position(letters.B, 6));
        this.enemyFleet[0].addPosition(new position(letters.B, 7));
        this.enemyFleet[0].addPosition(new position(letters.B, 8));

        this.enemyFleet[1].addPosition(new position(letters.E, 6));
        this.enemyFleet[1].addPosition(new position(letters.E, 7));
        this.enemyFleet[1].addPosition(new position(letters.E, 8));
        this.enemyFleet[1].addPosition(new position(letters.E, 9));

        this.enemyFleet[2].addPosition(new position(letters.A, 3));
        this.enemyFleet[2].addPosition(new position(letters.B, 3));
        this.enemyFleet[2].addPosition(new position(letters.C, 3));

        this.enemyFleet[3].addPosition(new position(letters.F, 8));
        this.enemyFleet[3].addPosition(new position(letters.G, 8));
        this.enemyFleet[3].addPosition(new position(letters.H, 8));

        this.enemyFleet[4].addPosition(new position(letters.C, 5));
        this.enemyFleet[4].addPosition(new position(letters.C, 6));
    }
}

module.exports = Battleship;
