let collissionFront: boolean;

let collissionBack;

let runningSpeed = 0;

let comment: string[] = ["You are enough", "you are amazing", "You are smart", " yoo u got this bro, heavy on it", " is time to end your flop era"];

let distance = 0;

// loops.forever(function () {





loops.forever(function () {

    pins.A2.digitalWrite(false)
    control.waitMicros(2)
    pins.A2.digitalWrite(true)
    control.waitMicros(10)
    pins.A2.digitalWrite(false)
    distance = pins.A3.pulseIn(PulseValue.High) / 58
    console.logValue("afstand in cm: ", distance)
    if (distance < 60) {
        approach()

    } else {

        crickit.motor1.run(runningSpeed = 50);

        crickit.motor2.run(runningSpeed = 50);


    }
})


function approach() {

    music.stopAllSounds();
        crickit.motor1.stop();

        crickit.motor2.stop();

        console.log(`${comment[Math.randomRange(0, comment.length - 1)]}`);

        music.powerUp.play();

        speaking();

        pause(500);

        music.stopAllSounds();

        control.runInParallel(function () {

            dance();

        })

        control.runInParallel(function () {

            lightPerformance();

        })
    
}



function lightPerformance() {

    //kan in array gezet worden

    for (let i = 0; i < 2; i++) {

        for (let i = 0; i < 3; i++) {

            light.clear();

            light.setAll(Colors.Red);

            pause(200);

            light.setAll(Colors.White);

            pause(200);

            light.setAll(Colors.Green);

            pause(200);

            light.setAll(Colors.Blue);

            pause(200);

            light.setAll(Colors.Pink);

            pause(200);

            light.clear();

        }

    }

}
function dance() {

    console.log("Is Dancing")

    for (let i = 0; i < 6; i++) {

        console.log("for");

        crickit.motor1.run(runningSpeed = 50);

        pause(500);

        crickit.motor1.stop();

        crickit.motor2.run(runningSpeed = 50);

        pause(500);

        crickit.motor2.stop();

    }

}

function speaking() {

    for (let i = 0; i < 4; i++) {

        for (let a = -1; a < 10; a++) {

            light.clear();

            light.setPixelColor(a, Colors.Yellow);

            pause(50);

        }

        for (let a = 10; a > -1; a--) {

            light.clear();

            light.setPixelColor(a, Colors.Yellow);

            pause(50);

        }

    }
}

//Emergency Stop voor wanneer de robot te wild doet en zichzelf kapot maakt tijdens het testen
function emergencyStop() {
    crickit.motor1.stop();
    crickit.motor2.stop();
    music.stopAllSounds();
    light.clear();
    console.log("Emergency stop succesful")
}

network.onInfraredReceivedNumber(function (num: 2223) {
    emergencyStop();
})

network.onInfraredReceivedNumber(function (num) {

    if (num === 2222) {

        console.log("hallo");
        crickit.motor1.run(runningSpeed = 50);

        crickit.motor2.run(runningSpeed = 50);

        pause(2000);

        approach()
        //vanaf die pause, als die distance werkt, vervangen met approach()

        control.runInParallel(function () {

            dance();

        })

        control.runInParallel(function () {

            lightPerformance();

        })

    }

})

input.buttonA.onEvent(ButtonEvent.Click, function () {

    network.infraredSendNumber(2222);


})



input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    network.infraredSendNumber(2223);
})



