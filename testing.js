var board = new five.Board({
    port: "/dev/cu.usbmodem1411"
});

board.on("ready", function() {

    this.stepper = new five.Stepper({
        type: five.Stepper.TYPE.FOUR_WIRE,
        stepsPerRev: 520,
        pins: {
            motor1: 8,
            motor2: 9,
            motor3: 10,
            motor4: 11
        }
    });
});


io.on('connection', function(socket){
    socket.on('startMotor', function(motorBody){
        board.stepper.rpm(20).step(2000, function() {
            console.log("Done stepping!");
        });
    });
});