let rectangleSketch = (p) => {
    class Rectangle {
        constructor() {
            this.t1 = undefined;
            this.t2 = undefined;
            this.t3 = undefined;
            this.t4 = undefined;

            this.p1 = undefined;
            this.p2 = undefined;
            this.p3 = undefined;
            this.p4 = undefined;

            this.timings = [];
            this.directions = [];
            for (let i = 0; i < 12; i++) {
                this.timings[i] = p.random([0, 1, 2, 3]);
                this.directions[i] = p.random([true, false]);
            }
        }

        update(t1, t2, t3, t4, p1, p2, p3, p4) {
            this.t1 = t1;
            this.t2 = t2;
            this.t3 = t3;
            this.t4 = t4;

            this.p1 = p1;
            this.p2 = p2;
            this.p3 = p3;
            this.p4 = p4;

            this.pt1 = p.createVector(this.t1, topBackLine(this.t1));
            this.pt2 = p.createVector(this.t2, topFrontLine(this.t2));
            this.pt3 = p.createVector(this.t2, bottomFrontLine(this.t2));
            this.pt4 = p.createVector(this.t1, bottomBackLine(this.t1));

            this.pt5 = p.createVector(this.t3, topBackLine(this.t3));
            this.pt6 = p.createVector(this.t4, topFrontLine(this.t4));
            this.pt7 = p.createVector(this.t4, bottomFrontLine(this.t4));
            this.pt8 = p.createVector(this.t3, bottomBackLine(this.t3));
        }

        getTimings(x) {
            let a = [this.p1, this.p2, this.p3, this.p4];
            return a[this.timings[x]];
        }

        getEdges() {
            return [this.getEdge1(), this.getEdge2(), this.getEdge3(), this.getEdge4(),
            this.getEdge5(), this.getEdge6(), this.getEdge7(), this.getEdge8(),
            this.getEdge9(), this.getEdge10(), this.getEdge11(), this.getEdge12()];
        }

        getEdge1() {
            if (this.directions[0]) {
                return [this.pt1.x, this.pt1.y,
                this.pt1.x - (this.pt1.x - this.pt2.x) * this.getTimings(0),
                this.pt1.y - (this.pt1.y - this.pt2.y) * this.getTimings(0)];
            } else {
                return [this.pt2.x, this.pt2.y,
                this.pt2.x - (this.pt2.x - this.pt1.x) * this.getTimings(0),
                this.pt2.y - (this.pt2.y - this.pt1.y) * this.getTimings(0)];
            }
        }

        getEdge2() {
            if (this.directions[1]) {
                return [this.pt3.x, this.pt3.y,
                this.pt2.x,
                this.pt3.y - (this.pt3.y - this.pt2.y) * this.getTimings(1)];
            } else {
                return [this.pt2.x, this.pt2.y,
                this.pt3.x,
                this.pt2.y - (this.pt2.y - this.pt3.y) * this.getTimings(1)];
            }
        }

        getEdge3() {
            if (this.directions[2]) {
                return [this.pt3.x, this.pt3.y,
                this.pt3.x - (this.pt3.x - this.pt4.x) * this.getTimings(2),
                this.pt3.y - (this.pt3.y - this.pt4.y) * this.getTimings(2)];
            } else {
                return [this.pt4.x, this.pt4.y,
                this.pt4.x - (this.pt4.x - this.pt3.x) * this.getTimings(2),
                this.pt4.y - (this.pt4.y - this.pt3.y) * this.getTimings(2)];
            }
        }

        getEdge4() {
            if (this.directions[3]) {
                return [this.pt1.x, this.pt1.y,
                this.pt4.x,
                this.pt1.y - (this.pt1.y - this.pt4.y) * this.getTimings(3)];
            } else {
                return [this.pt4.x, this.pt4.y,
                this.pt1.x,
                this.pt4.y - (this.pt4.y - this.pt1.y) * this.getTimings(3)];
            }
        }

        getEdge5() {
            if (this.directions[4]) {
                return [this.pt1.x, this.pt1.y,
                this.pt1.x - (this.pt1.x - this.pt5.x) * this.getTimings(4),
                this.pt1.y - (this.pt1.y - this.pt5.y) * this.getTimings(4)];
            } else {
                return [this.pt5.x, this.pt5.y,
                this.pt5.x - (this.pt5.x - this.pt1.x) * this.getTimings(4),
                this.pt5.y - (this.pt5.y - this.pt1.y) * this.getTimings(4)];
            }
        }

        getEdge6() {
            if (this.directions[5]) {
                return [this.pt6.x, this.pt6.y,
                this.pt6.x - (this.pt6.x - this.pt2.x) * this.getTimings(5),
                this.pt6.y - (this.pt6.y - this.pt2.y) * this.getTimings(5)];
            } else {
                return [this.pt2.x, this.pt2.y,
                this.pt2.x - (this.pt2.x - this.pt6.x) * this.getTimings(5),
                this.pt2.y - (this.pt2.y - this.pt6.y) * this.getTimings(5)];
            }
        }

        getEdge7() {
            if (this.directions[6]) {
                return [this.pt3.x, this.pt3.y,
                this.pt3.x - (this.pt3.x - this.pt7.x) * this.getTimings(6),
                this.pt3.y - (this.pt3.y - this.pt7.y) * this.getTimings(6)];
            } else {
                return [this.pt7.x, this.pt7.y,
                this.pt7.x - (this.pt7.x - this.pt3.x) * this.getTimings(6),
                this.pt7.y - (this.pt7.y - this.pt3.y) * this.getTimings(6)];
            }
        }

        getEdge8() {
            if (this.timings[7]) {
                return [this.pt8.x, this.pt8.y,
                this.pt8.x - (this.pt8.x - this.pt4.x) * this.getTimings(7),
                this.pt8.y - (this.pt8.y - this.pt4.y) * this.getTimings(7)];
            } else {
                return [this.pt4.x, this.pt4.y,
                this.pt4.x - (this.pt4.x - this.pt8.x) * this.getTimings(7),
                this.pt4.y - (this.pt4.y - this.pt8.y) * this.getTimings(7)];
            }
        }

        getEdge9() {
            if (this.directions[8]) {
                return [this.pt5.x, this.pt5.y,
                this.pt5.x - (this.pt5.x - this.pt6.x) * this.getTimings(8),
                this.pt5.y - (this.pt5.y - this.pt6.y) * this.getTimings(8)];
            } else {
                return [this.pt6.x, this.pt6.y,
                this.pt6.x - (this.pt6.x - this.pt5.x) * this.getTimings(8),
                this.pt6.y - (this.pt6.y - this.pt5.y) * this.getTimings(8)];
            }
        }

        getEdge10() {
            if (this.directions[9]) {
                return [this.pt7.x, this.pt7.y,
                this.pt6.x,
                this.pt7.y - (this.pt7.y - this.pt6.y) * this.getTimings(9)];
            } else {
                return [this.pt6.x, this.pt6.y,
                this.pt7.x,
                this.pt6.y - (this.pt6.y - this.pt7.y) * this.getTimings(9)];
            }
        }

        getEdge11() {
            if (this.directions[10]) {
                return [this.pt7.x, this.pt7.y,
                this.pt7.x - (this.pt7.x - this.pt8.x) * this.getTimings(10),
                this.pt7.y - (this.pt7.y - this.pt8.y) * this.getTimings(10)];
            } else {
                return [this.pt8.x, this.pt8.y,
                this.pt8.x - (this.pt8.x - this.pt7.x) * this.getTimings(10),
                this.pt8.y - (this.pt8.y - this.pt7.y) * this.getTimings(10)];
            }
        }

        getEdge12() {
            if (this.directions[11]) {
                return [this.pt5.x, this.pt5.y,
                this.pt8.x,
                this.pt5.y - (this.pt5.y - this.pt8.y) * this.getTimings(11)];
            } else {
                return [this.pt8.x, this.pt8.y,
                this.pt5.x,
                this.pt8.y - (this.pt8.y - this.pt5.y) * this.getTimings(11)];
            }
        }

    }

    let c;
    let pCount;

    let count;
    let ticks;

    // rectangles
    let rectangles;
    let rectanglesSetup;

    p.setup = () => {
        p.createCanvas(document.getElementById('sketch-3-container').getBoundingClientRect().width, document.getElementById('sketch-3-container').getBoundingClientRect().width).parent('sketch-3-container');
        c = 0;
        pCount = 300;
        ticks = 1000;
        rectanglesSetup = true;
    };

    p.draw = () => {
        p.background(0);
        c++;
        count = c * (ticks / pCount);

        rectanglesSketch();

        if (c >= pCount) {
            c = 0;
            rectanglesSetup = true;
        }
    };

    function rectanglesSketch() {
        if (rectanglesSetup) {
            rectangles = [];
            for (let i = 0; i < 3; i++) {
                rectangles[i] = new Rectangle();
            }
            rectanglesSetup = false;
        }

        let t = count;
        let tl = t * 2; // lines
        let tr = t * 1.5; // rectangles

        p.stroke(200);
        p.strokeWeight(1);
        p.drawingContext.setLineDash([p.width / 50, p.width / 50]);

        p.line(0, bottomFrontLine(0), tl, bottomFrontLine(tl));
        p.line(0, topFrontLine(0), tl, topFrontLine(tl));
        p.line(0, bottomBackLine(0), tl - (p.width / 10), bottomBackLine(tl - (p.width / 10)));
        p.line(0, topBackLine(0), tl - (p.width / 10), topBackLine(tl - (p.width / 10)));

        if (t >= ticks * 0.7) {
            p.drawingContext.setLineDash([]);
            p.strokeWeight(2);
            p.stroke(0);

            let tlb = p.map(t, ticks * 0.7, ticks * 0.9, 0, p.width);

            p.line(0, bottomFrontLine(0), tlb, bottomFrontLine(tlb));
            p.line(0, topFrontLine(0), tlb, topFrontLine(tlb));
            p.line(0, bottomBackLine(0), tlb - (p.width / 10), bottomBackLine(tlb - (p.width / 10)));
            p.line(0, topBackLine(0), tlb - (p.width / 10), topBackLine(tlb - (p.width / 10)));
        }

        let p1 = clamp((t - (ticks * 0.15)) / (ticks * 0.4), 0, 1);
        let p2 = clamp((t - (ticks * 0.1)) / (ticks * 0.6), 0, 1);
        let p3 = clamp((t - (ticks * 0.05)) / (ticks * 0.7), 0, 1);
        let p4 = clamp(t / (ticks * 0.9), 0, 1);

        {
            let t1 = tr - 250;
            rectangles[0].update(t1, t1 + 50, t1 + 120, t1 + 170, p1, p2, p3, p4);
        }

        {
            let t1 = tr - 500;
            rectangles[1].update(t1, t1 + 50, t1 + 120, t1 + 170, p1, p2, p3, p4);
        }

        {
            let t1 = tr - 750;
            rectangles[2].update(t1, t1 + 50, t1 + 120, t1 + 170, p1, p2, p3, p4);
        }

        drawRectangles();
    }

    function drawRectangles() {
        p.stroke(255);
        p.strokeWeight(2);
        p.drawingContext.setLineDash([]);

        for (let r of rectangles) {
            let edges = r.getEdges();
            for (let i = 0; i < 12; i++) {
                let e = edges[i];
                p.line(e[0], e[1], e[2], e[3]);
            }
        }
    }

    function topFrontLine(t) {
        return -(t * (p.width / 2500)) + (p.width * 0.3);
    }

    function topBackLine(t) {
        return -((p.width * 0.0003) * t) + (p.width / 5);
    }

    function bottomFrontLine(t) {
        return -((p.width / 1250) * t) + (p.width * 0.9);
    }

    function bottomBackLine(t) {
        return -((p.width / 1428.57) * t) + (p.width * 0.8);
    }

    function clamp(value, minimum, maximum) {
        return Math.max(minimum, Math.min(value, maximum));
    }
};

new p5(rectangleSketch);