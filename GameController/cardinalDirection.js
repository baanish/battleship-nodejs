require('enum').register();
var CardinalDirection = new Enum({
    'N': 1,
    'E': 2,
    'S': 3,
    'W': 4,
}, {
    ignoreCase: true
});

module.exports = CardinalDirection;
