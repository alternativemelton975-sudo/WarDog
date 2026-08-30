var stage = document.getElementById("game-area");
var dog = document.getElementById("Travel");
var posX = 50;
var posY = 50;
var moveSpeed = 8;
var keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    left: false,
    down: false,
    right: false
};
var robots = [];

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateDogPosition(targetDog, x, y) {
    if (!targetDog) {
        return;
    }

    targetDog.style.position = "absolute";
    targetDog.style.left = x + "px";
    targetDog.style.top = y + "px";
}

function createRobot(x, y) {
    var robot = document.createElement("div");
    robot.className = "robot";
    robot.style.left = x + "px";
    robot.style.top = y + "px";
    stage.appendChild(robot);
    robots.push({
        x: x,
        y: y,
        elem: robot
    });
}

function createDogClone(x, y) {
    var clone = document.createElement("div");
    clone.className = "war-dog clone";
    clone.style.left = x + "px";
    clone.style.top = y + "px";
    stage.appendChild(clone);
    return {
        x: x,
        y: y,
        elem: clone
    };
}

function populateRobots() {
    createRobot(260, 100);
    createRobot(480, 180);
    createRobot(340, 290);
}

function handleKeyState(event, isPressed) {
    var key = event.key.toLowerCase();

    if (key === "w" || key === "a" || key === "s" || key === "d") {
        keys[key] = isPressed;
        event.preventDefault();
    }

    if (key === "arrowup") {
        keys.up = isPressed;
        event.preventDefault();
    }
    if (key === "arrowleft") {
        keys.left = isPressed;
        event.preventDefault();
    }
    if (key === "arrowdown") {
        keys.down = isPressed;
        event.preventDefault();
    }
    if (key === "arrowright") {
        keys.right = isPressed;
        event.preventDefault();
    }
}

document.addEventListener("keydown", function(event) {
    handleKeyState(event, true);
});

document.addEventListener("keyup", function(event) {
    handleKeyState(event, false);
});

function movePlayer() {
    if (keys.w || keys.up) {
        posY -= moveSpeed;
    }
    if (keys.s || keys.down) {
        posY += moveSpeed;
    }
    if (keys.a || keys.left) {
        posX -= moveSpeed;
    }
    if (keys.d || keys.right) {
        posX += moveSpeed;
    }

    posX = clamp(posX, 0, stage.clientWidth - 40);
    posY = clamp(posY, 0, stage.clientHeight - 40);
    updateDogPosition(dog, posX, posY);
}

function checkRobotCollisions() {
    for (var i = robots.length - 1; i >= 0; i--) {
        var robot = robots[i];
        var dx = posX - robot.x;
        var dy = posY - robot.y;

        if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
            var clone = createDogClone(posX + 12, posY + 12);
            clone.elem.style.zIndex = "2";
            robot.elem.remove();
            robots.splice(i, 1);
            createRobot(Math.random() * (stage.clientWidth - 60), Math.random() * (stage.clientHeight - 60));
        }
    }
}

function tick() {
    movePlayer();
    checkRobotCollisions();
}

if (dog) {
    updateDogPosition(dog, posX, posY);
    populateRobots();
    setInterval(tick, 16);
}

function myMove() {
    if (dog) {
        updateDogPosition(dog, posX, posY);
    }
}