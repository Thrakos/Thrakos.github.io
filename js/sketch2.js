function setup() {
    createCanvas(document.getElementById('sketch-container').getBoundingClientRect().width, document.getElementById('sketch-container').getBoundingClientRect().width).parent('sketch-container');
}

function draw() {
    fill(0);
    ellipse(width / 2, height / 2, width, height);
}