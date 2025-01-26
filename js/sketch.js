const sketch = (p) => {

    let ballSize;
    let ballRadius;
    let borderBuffer;

    let squareSize;
    let numSquares;

    let squareColors;

    let x1, y1, x2, y2;
    let x1v, y1v, x2v, y2v;

    let minSpeed, maxSpeed;

    p.setup = () => {
        p.createCanvas(document.getElementById('sketch-container').getBoundingClientRect().width, document.getElementById('sketch-container').getBoundingClientRect().width).parent('sketch-container');

        p.background(120);

        ballSize = p.width / 25;
        ballRadius = ballSize / 2;
        borderBuffer = ballSize / 2;

        numSquares = 10;
        squareSize = p.width / numSquares;

        squareColors = Array(numSquares)
            .fill()
            .map(() => Array(numSquares).fill(0));

        x1 = 30;
        y1 = p.height - 30;

        x2 = p.width - 30;
        y2 = 30;

        x1v = p.width / 166;
        y1v = -p.width / 166;
        x2v = p.width / 166;
        y2v = p.width / 166;

        minSpeed = p.width / 200;
        maxSpeed = p.width / 100;

        for (let c = 0; c < numSquares; c++) {
            for (let r = c; r < numSquares; r++) {
                squareColors[r][c] = 255;
            }
        }
    };

    p.draw = () => {
        p.noStroke();

        // Draw squares
        for (let c = 0; c < numSquares; c++) {
            for (let r = 0; r < numSquares; r++) {
                p.fill(squareColors[r][c]);
                p.rect(c * squareSize, r * squareSize, squareSize, squareSize);
            }
        }

        // draw bounding box
        p.noFill();
        p.stroke(50);
        p.strokeWeight(3);
        p.rect(0, 0, p.width, p.height);

        // Regulate speeds
        p.regulateSpeeds();

        // Update positions
        x1 += x1v;
        y1 += y1v;
        x2 += x2v;
        y2 += y2v;

        // Check bounce
        p.checkBounce1();
        p.checkBounce2();

        // Draw balls
        p.noStroke();
        p.fill(0);
        p.ellipse(x1, y1, ballSize, ballSize);

        p.fill(255);
        p.ellipse(x2, y2, ballSize, ballSize);
    };

    p.regulateSpeeds = () => {
        let x1vn = x1v < 0 ? -1 : 1;
        let y1vn = y1v < 0 ? -1 : 1;
        let x2vn = x2v < 0 ? -1 : 1;
        let y2vn = y2v < 0 ? -1 : 1;

        if (p.abs(x1v) < minSpeed) x1v = minSpeed * x1vn;
        if (p.abs(x1v) > maxSpeed) x1v = maxSpeed * x1vn;

        if (p.abs(y1v) < minSpeed) y1v = minSpeed * y1vn;
        if (p.abs(y1v) > maxSpeed) y1v = maxSpeed * y1vn;

        if (p.abs(x2v) < minSpeed) x2v = minSpeed * x2vn;
        if (p.abs(x2v) > maxSpeed) x2v = maxSpeed * x2vn;

        if (p.abs(y2v) < minSpeed) y2v = minSpeed * y2vn;
        if (p.abs(y2v) > maxSpeed) y2v = maxSpeed * y2vn;
    };

    p.checkBounce1 = () => {
        if (x1 <= borderBuffer) {
            x1v *= -1;
            x1 = borderBuffer;
            return;
        }
        if (x1 >= p.width - borderBuffer) {
            x1v *= -1;
            x1 = p.width - borderBuffer;
            return;
        }

        if (y1 <= borderBuffer) {
            y1v *= -1;
            y1 = borderBuffer;
            return;
        }

        if (y1 >= p.height - borderBuffer) {
            y1v *= -1;
            y1 = p.height - borderBuffer;
            return;
        }

        let triangleLength = ballRadius / Math.sqrt(2);

        let cols = [
            x1,
            x1 + triangleLength,
            x1 + ballRadius,
            x1 + triangleLength,
            x1,
            x1 - triangleLength,
            x1 - ballRadius,
            x1 - triangleLength
        ];
        let rows = [
            y1 - ballRadius,
            y1 - triangleLength,
            y1,
            y1 + triangleLength,
            y1 + ballRadius,
            y1 + triangleLength,
            y1,
            y1 - triangleLength
        ];

        let checks = [0, 2, 4, 6, 1, 3, 5, 7];

        for (let i = 0; i < 8; i++) {
            cols[i] = cols[i] / squareSize;
            rows[i] = rows[i] / squareSize;
        }

        for (let i of checks) {
            if (squareColors[Math.floor(rows[i])][Math.floor(cols[i])] == 0) {
                let cols2 = [
                    x2 + ballRadius,
                    x2 + ballRadius,
                    x2 - ballRadius,
                    x2 - ballRadius
                ];
                let rows2 = [
                    y2 - ballRadius,
                    y2 + ballRadius,
                    y2 + ballRadius,
                    y2 - ballRadius
                ];
                let toggle = true;

                for (let j = 0; j < 4; j++) {
                    if (
                        Math.floor(cols2[j] / squareSize) == Math.floor(cols[i]) &&
                        Math.floor(rows2[j] / squareSize) == Math.floor(rows[i])
                    ) {
                        toggle = false;
                    }
                }
                if (toggle) {
                    squareColors[Math.floor(rows[i])][Math.floor(cols[i])] = 255;
                    x1v *= 1 + (p.random(0.4) - 0.2);
                    y1v *= 1 + (p.random(0.4) - 0.2);
                }

                if (i == 0 || i == 4) {
                    y1v *= -1;
                    return;
                } else if (i == 2 || i == 6) {
                    x1v *= -1;
                    return;
                } else if (i == 1) {
                    if (x1v > 0) {
                        if (y1v < 0) {
                            let tmp = x1v;
                            x1v = y1v;
                            y1v = tmp;
                        } else {
                            x1v *= -1;
                        }
                    } else {
                        y1v *= -1;
                    }
                    return;
                } else if (i == 3) {
                    if (x1v > 0) {
                        if (y1v > 0) {
                            let tmp = x1v;
                            x1v = -1 * y1v;
                            y1v = -1 * tmp;
                        } else {
                            x1v *= -1;
                        }
                    } else {
                        y1v *= -1;
                    }
                    return;
                } else if (i == 5) {
                    if (x1v < 0) {
                        if (y1v > 0) {
                            let tmp = x1v;
                            x1v = y1v;
                            y1v = tmp;
                        } else {
                            x1v *= -1;
                        }
                    } else {
                        y1v *= -1;
                    }
                    return;
                } else if (i == 7) {
                    if (x1v < 0) {
                        if (y1v < 0) {
                            let tmp = x1v;
                            x1v = -1 * y1v;
                            y1v = -1 * tmp;
                        } else {
                            x1v *= -1;
                        }
                    } else {
                        y1v *= -1;
                    }
                    return;
                }
            }
        }
    };

    p.checkBounce2 = () => {
        if (x2 <= borderBuffer) {
            x2v *= -1;
            x2 = borderBuffer;
            return;
        }
        if (x2 >= p.width - borderBuffer) {
            x2v *= -1;
            x2 = p.width - borderBuffer;
            return;
        }

        if (y2 <= borderBuffer) {
            y2v *= -1;
            y2 = borderBuffer;
            return;
        }

        if (y2 >= p.height - borderBuffer) {
            y2v *= -1;
            y2 = p.height - borderBuffer;
            return;
        }

        let triangleLength = ballRadius / Math.sqrt(2);

        let cols = [
            x2,
            x2 + triangleLength,
            x2 + ballRadius,
            x2 + triangleLength,
            x2,
            x2 - triangleLength,
            x2 - ballRadius,
            x2 - triangleLength
        ];
        let rows = [
            y2 - ballRadius,
            y2 - triangleLength,
            y2,
            y2 + triangleLength,
            y2 + ballRadius,
            y2 + triangleLength,
            y2,
            y2 - triangleLength
        ];

        let checks = [0, 2, 4, 6, 1, 3, 5, 7];

        for (let i = 0; i < 8; i++) {
            cols[i] = cols[i] / squareSize;
            rows[i] = rows[i] / squareSize;
        }

        for (let i of checks) {
            if (squareColors[Math.floor(rows[i])][Math.floor(cols[i])] == 255) {
                let cols2 = [
                    x1 + ballRadius,
                    x1 + ballRadius,
                    x1 - ballRadius,
                    x1 - ballRadius
                ];
                let rows2 = [
                    y1 - ballRadius,
                    y1 + ballRadius,
                    y1 + ballRadius,
                    y1 - ballRadius
                ];
                let toggle = true;

                for (let j = 0; j < 4; j++) {
                    if (
                        Math.floor(cols2[j] / squareSize) == Math.floor(cols[i]) &&
                        Math.floor(rows2[j] / squareSize) == Math.floor(rows[i])
                    ) {
                        toggle = false;
                    }
                }
                if (toggle) {
                    x2v *= 1 + (p.random(0.4) - 0.2);
                    y2v *= 1 + (p.random(0.4) - 0.2);
                    squareColors[Math.floor(rows[i])][Math.floor(cols[i])] = 0;
                }

                if (i == 0 || i == 4) {
                    y2v *= -1;
                    return;
                } else if (i == 2 || i == 6) {
                    x2v *= -1;
                    return;
                } else if (i == 1) {
                    if (x2v > 0) {
                        if (y2v < 0) {
                            let tmp = x2v;
                            x2v = y2v;
                            y2v = tmp;
                        } else {
                            x2v *= -1;
                        }
                    } else {
                        y2v *= -1;
                    }
                    return;
                } else if (i == 3) {
                    if (x2v > 0) {
                        if (y2v > 0) {
                            let tmp = x2v;
                            x2v = -1 * y2v;
                            y2v = -1 * tmp;
                        } else {
                            x2v *= -1;
                        }
                    } else {
                        y2v *= -1;
                    }
                    return;
                } else if (i == 5) {
                    if (x2v < 0) {
                        if (y2v > 0) {
                            let tmp = x2v;
                            x2v = y2v;
                            y2v = tmp;
                        } else {
                            x2v *= -1;
                        }
                    } else {
                        y2v *= -1;
                    }
                    return;
                } else if (i == 7) {
                    if (x2v < 0) {
                        if (y2v < 0) {
                            let tmp = x2v;
                            x2v = -1 * y2v;
                            y2v = -1 * tmp;
                        } else {
                            x2v *= -1;
                        }
                    } else {
                        y2v *= -1;
                    }
                    return;
                }
            }
        }
    };
}

new p5(sketch);