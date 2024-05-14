const gameController = require("../GameController/gameController.js");
const letters = require("../GameController/letters.js");
const position = require("../GameController/position.js");

module.exports = function setupTestShips() {
    var ships = gameController.InitializeShips();
    counter = 1;
    ships.forEach(ship => {
      for (var i = 1; i <= ship.size; i++) {
        column = letters.get(counter);
        ship.addPosition(new position(letters.get(counter), i))
      }
      counter++;
    })
  
    return ships;
  }