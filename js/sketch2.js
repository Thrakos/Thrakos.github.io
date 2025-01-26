const sketch2 = (p) => {

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

    p.setup = () => {
        p.createCanvas(document.getElementById('sketch-2-container').getBoundingClientRect().width, document.getElementById('sketch-2-container').getBoundingClientRect().width).parent('sketch-2-container');

        ball.x = p.width / 2 + 1;
        ball.y = p.height / 3;
        ball.v = p.createVector(p.random(-p.width / 125, p.width / 125), p.random(-p.width / 80, -p.width / 250));
        ball.radius = p.width / 100;
        ball.grow = 1;
        ball.growthRate = p.width / 250;
        ball.minRadius = p.width / 100;

        bigCircle.x = p.width / 2;
        bigCircle.y = p.width / 2;
        bigCircle.radius = p.width * 5 / 11;

    };

    p.draw = () => {
        p.background(0);

        // Draw the larger circle
        p.noFill();
        p.stroke(255);
        p.strokeWeight(3);
        p.circle(bigCircle.x, bigCircle.y, bigCircle.radius * 2);

        // update ball
        ball.v.y += gravity;

        ball.x += ball.v.x;
        ball.y += ball.v.y;

        // check collision
        p.calculateCollision();

        // make sure ball is not above max speed

        // Draw the ball
        p.fill(255);
        p.noStroke();
        p.circle(ball.x, ball.y, ball.radius * 2);
    };

    p.regulateSpeed = () => {
        if (ball.v.mag() > p.width / 30) {
            ball.v.setMag(p.width / 30);
        }
    };

    p.calculateCollision = () => {
        // Check for collision with the larger circle
        let dx = ball.x - bigCircle.x;
        let dy = ball.y - bigCircle.y;
        let distance = p.sqrt(dx * dx + dy * dy);

        if (distance + ball.radius > bigCircle.radius) {
            // Calculate the normal vector at the point of collision
            let normalV = p.createVector(dx, dy).normalize();

            // Reflect the velocity using the formula
            let dotV = ball.v.dot(normalV);
            ball.v.x -= 2 * dotV * normalV.x;
            ball.v.y -= 2 * dotV * normalV.y;

            p.onCollision();

            // Reposition the ball slightly inside the larger circle to prevent sticking
            let overlap = distance + ball.radius - bigCircle.radius;
            ball.x -= normalV.x * overlap;
            ball.y -= normalV.y * overlap;

        }
    };

    p.onCollision = () => {
        // update ball radius
        ball.radius += ball.growthRate * ball.grow;

        if (ball.radius >= bigCircle.radius || ball.radius <= ball.minRadius) {
            ball.grow *= -1;
        }

        if (ball.y > p.height * 3 / 5 && ball.v.mag() < p.width / 100) {
            ball.v.setMag(p.width / 75);
        } else if (ball.x >= p.width / 3 && ball.x <= p.width * 2 / 3) {
            if (ball.y > p.height * 3 / 5) {

                let div = 0;

                if (ball.y > p.height * 3 / 4 && ball.grow == -1) {
                    div = 8000;
                } else if (ball.grow == -1 && ball.v.mag() < p.width / 50) {
                    div = 7000;
                } else if (ball.v.mag() < p.width / 60) {
                    div = 10000;
                }

                if (div != 0) {
                    ball.v.x *= 1 + (p.width / div);
                    ball.v.y *= - 1 + (p.width / div);
                }

            }
        }

    };
};

new p5(sketch2);