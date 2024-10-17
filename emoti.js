let collissionFront;

let collissionBack;

let runningSpeed = 0;

let comment: string[] = ["You are enough", "you are amazing", "You are smart", " yoo u got this bro, heavy on it", " is time to end your flop era"]

function lightPerformance() {

    for (let i = 0; i < 2; i++) {

        for (let i = 0; i < 3; i++) {

            light.clear()

            light.setAll(Colors.Red)

            pause(200)

            light.setAll(Colors.White)

            pause(200)

            light.setAll(Colors.Green)

            pause(200)

            light.setAll(Colors.Blue)

            pause(200)

            light.setAll(Colors.Pink)

            pause(200)

            light.clear()

        }

    }

}
function dance() {

    console.log("Is Dancing")

    for (let i = 0; i < 6; i++) {

        console.log("for")

        crickit.motor1.run(runningSpeed = 50)

        pause(500)

        crickit.motor1.stop()

        crickit.motor2.run(runningSpeed = 50)

        pause(500)

        crickit.motor2.stop()

    }

}

function speaking() {

    for (let i = 0; i < 4; i++) {

        for (let a = -1; a < 10; a++) {

            light.clear()

            light.setPixelColor(a, Colors.Yellow)

            pause(50)

        }

        for (let a = 10; a > -1; a--) {

            light.clear()

            light.setPixelColor(a, Colors.Yellow)

            pause(50)

        }

    }
}

//Emergency Stop voor wanneer de robot te wild doet en zichzelf kapot maakt tijdens het testen
function emergencyStop() {
    crickit.motor1.stop()
    crickit.motor2.stop()
    music.stopAllSounds()
    light.clear()

}

network.onInfraredReceivedNumber(function (num: 2223) {
    emergencyStop()
})

network.onInfraredReceivedNumber(function (num: 2222) {

    if (num === 2222) {

        crickit.motor1.run(runningSpeed = 50)

        crickit.motor2.run(runningSpeed = 50)

        pause(2000)

        crickit.motor1.stop()

        crickit.motor2.stop()

        console.log(`${comment[Math.randomRange(0, comment.length - 1)]}`)

        music.powerUp.play()

        speaking()

        pause(500)

        music.stopAllSounds()

        control.runInParallel(function () {

            dance();

        })

        control.runInParallel(function () {

            lightPerformance();

        })

    } else {

    }

})

input.buttonA.onEvent(ButtonEvent.Click, function () {

    network.infraredSendNumber(2222)

})



input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    network.infraredSendNumber(2223)
})
