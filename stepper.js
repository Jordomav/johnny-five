var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.FOUR_WIRE,
        stepsPerRev: 200,
        pins: {
            motor1: 8,
            motor2: 9,
            motor3: 10,
            motor4: 11
        }
    });

    stepper.rpm(20).ccw().step(2000, function() {
        console.log("done");
    });
});