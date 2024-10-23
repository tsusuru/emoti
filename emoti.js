let collissionFront: boolean;

let collissionBack;

let runningSpeed = 0;

let comment: string[] = ["You are enough", "you are amazing", "You are smart", " yoo u got this bro, heavy on it", " is time to end your flop era"];

let distance = 0;

let colors = [Colors.Red, Colors.White, Colors.Green, Colors.Blue, Colors.Pink];

// Shows the lights
function lightPerformance() {


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




// Function for dancing
function dance() {

    console.log("Is Dancing")



    for (let i = 0; i < 3; i++) {

        console.log("for");

        crickit.motor1.run(runningSpeed = 40);
        crickit.motor2.run(runningSpeed = 40);

        pause(500);

        crickit.motor1.run(runningSpeed = -40);
        crickit.motor2.run(runningSpeed = -40);

        pause(500);

        crickit.motor1.stop()
        crickit.motor2.stop();

    }

}

// Function for speaking
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

//Emergency stop to stop the robot (test use)
function emergencyStop() {
    crickit.motor1.stop();
    crickit.motor2.stop();
    music.stopAllSounds();
    light.clear();
    console.log("Emergency stop succesful")
}


//wheels are in reverse, so negative values makes it drive forward!
loops.forever(function () {
    // Ultrsonic sensor code
    pins.A2.digitalWrite(false);
    control.waitMicros(2);
    pins.A2.digitalWrite(true);
    control.waitMicros(10);
    pins.A2.digitalWrite(false);


    distance = pins.A3.pulseIn(PulseValue.High) / 58;


    if (distance > 400 || distance < 2) {
        console.log("Ongeldig echo-signaal, negeer meting...");
    } else {
        console.logValue("Afstand in cm: ", distance);
        // Dance if it comes to close
        if (distance <= 60 && distance >= 10) {
            crickit.motor1.stop();
            crickit.motor2.stop();
            control.runInParallel(function () {
                dance();
            });
        }
        // Approach
        else if (distance < 125 && distance >= 60) {
            crickit.motor1.run(runningSpeed = -40);
            crickit.motor2.run(runningSpeed = -40);
            console.log(`${comment[Math.randomRange(0, comment.length - 1)]}`);
            music.powerUp.play()
            control.runInParallel(function () {
                speaking();
            });
            pause(2000);

            crickit.motor1.stop();
            crickit.motor2.stop();
            music.stopAllSounds();
        }
        // Backs off when too close
        if (distance < 10) {
            crickit.motor1.run(runningSpeed = 50);
            crickit.motor2.run(runningSpeed = 50);
            pause(500);


            crickit.motor1.stop();
            crickit.motor2.stop();
        }
    }

    //Pauses the reading of the sensor
    basic.pause(100);
});




