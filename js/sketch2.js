let ball = {
    x: undefined,       // Ball's initial x position
    y: undefined,       // Ball's initial y position
    v: undefined,
    radius: undefined,  // Ball's radius
    grow: undefined,    // Whether or not the ball is growing or shrinking
    growthRate: undefined,
    minRadius: undefined
};

let bigCircle = {
    x: undefined,     // Big circle's x position (center)
    y: undefined,     // Big circle's y position (center)
    radius: undefined // Big circle's radius
};

let gravity = 0.2;

function setup() {
    createCanvas(document.getElementById('sketch-2-container').getBoundingClientRect().width, document.getElementById('sketch-2-container').getBoundingClientRect().width).parent('sketch-container');

    ball.x = width / 2 + 1;
    ball.y = height / 3;
    ball.v = createVector(random(-width / 125, width / 125), random(-width / 80, -width / 250));
    ball.radius = width / 100;
    ball.grow = 1;
    ball.growthRate = width / 250;
    ball.minRadius = width / 100;

    bigCircle.x = width / 2;
    bigCircle.y = width / 2;
    bigCircle.radius = width * 5 / 11;

}

function draw() {
    background(0);

    // Draw the larger circle
    noFill();
    stroke(255);
    strokeWeight(3);
    circle(bigCircle.x, bigCircle.y, bigCircle.radius * 2);

    // update ball
    ball.v.y += gravity;

    ball.x += ball.v.x;
    ball.y += ball.v.y;

    // check collision
    calculateCollision();

    // make sure ball is not above max speed

    // Draw the ball
    fill(255);
    noStroke();
    circle(ball.x, ball.y, ball.radius * 2);
}

function regulateSpeed() {
    let velocity = createVector(ball.vx, ball.vy);
    if (velocity.mag() > width / 30) {
        velocity.setMag(width / 30);
    }
    ball.v.add(velocity);
}

function calculateCollision() {
    // Check for collision with the larger circle
    let dx = ball.x - bigCircle.x;
    let dy = ball.y - bigCircle.y;
    let distance = sqrt(dx * dx + dy * dy);

    if (distance + ball.radius > bigCircle.radius) {
        // Calculate the normal vector at the point of collision
        let normalV = createVector(dx, dy).normalize();

        // Reflect the velocity using the formula
        let dotV = ball.v.dot(normalV);
        ball.v.x -= 2 * dotV * normalV.x;
        ball.v.y -= 2 * dotV * normalV.y;

        onCollision();

        // Reposition the ball slightly inside the larger circle to prevent sticking
        let overlap = distance + ball.radius - bigCircle.radius;
        ball.x -= normalV.x * overlap;
        ball.y -= normalV.y * overlap;

    }
}

function onCollision() {
    // update ball radius
    ball.radius += ball.growthRate * ball.grow;

    if (ball.radius >= bigCircle.radius || ball.radius <= ball.minRadius) {
        ball.grow *= -1;
    }

    if (ball.y > height * 3 / 5 && ball.v.mag() < width / 100) {
        ball.v.setMag(width / 75);
        print("set velocity");
    } else if (ball.x >= width / 3 && ball.x <= width * 2 / 3) {
        if (ball.y > height * 3 / 5) {

            let div = 0;

            if (ball.y > height * 3 / 4 && ball.grow == -1) {
                div = 8000;
                print("green");
            } else if (ball.grow == -1 && ball.v.mag() < width / 50) {
                div = 7000;
                print("shrink");
            } else if (ball.v.mag() < width / 60) {
                div = 10000;
                print("grow");
            }

            if (div != 0) {
                ball.v.x *= 1 + (width / div);
                ball.v.y * - 1 + (width / div);
            }

        }
    }

}