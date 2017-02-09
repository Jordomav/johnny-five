var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    five = require("johnny-five"),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname)));

app.get('/', function (req,res) {
   res.sendFile(__dirnam + '/index.html')
});

io.on('connection', function(socket){
    socket.on('startMotor', function(motorBody){
        var board = new five.Board({
            port: "/dev/cu.usbmodem1411"
        });

        board.on("ready", function() {

            var stepper = new five.Stepper({
                type: five.Stepper.TYPE.FOUR_WIRE,
                stepsPerRev: motorBody.numberOfSteps,
                pins: {
                    motor1: 8,
                    motor2: 9,
                    motor3: 10,
                    motor4: 11
                }
            });

            stepper.rpm(motorBody.rpms).ccw().step(2000, function() {
                console.log("done");
            });
        });
    });
});

http.listen(8000, function () {
   console.log('Johnny Five running on localhost:8000')
});