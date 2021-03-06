var five = require("johnny-five");
var board = new five.Board({
    port: "/dev/cu.usbmodem1411"
});

board.on("ready", function() {

    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.FOUR_WIRE,
        stepsPerRev: 520,
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