let fantasma;
let crianca;
let Pos = 700;
let tempo = 0;
let luzLigada = true;

function preload() {
  fantasma = loadImage('../imagens/corredorassombrado/fantasma.png');
  crianca = loadImage('../imagens/corredorassombrado/crianca.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(40, 45, 50);

  fill(84, 62, 45);
  noStroke();
  rect(0, height / 2, width, height / 2);

  fill(150, 30, 30);
  rect(50, height - 170, width - 100, 130);

  noFill();
  stroke(220, 180, 50);
  strokeWeight(3);
  rect(60, height - 160, width - 120, 110);

  stroke(240);
  strokeWeight(2);

  let y = height - 155;
  for (let i = 0; i < 6; i++) {
    line(45, y, 50, y);
    line(width - 50, y, width - 45, y);
    y += 20;
  }

  noStroke();
  fill(100, 60, 20);
  rect(20, 60, 60, 80);

  fill(220, 220, 180);
  rect(28, 68, 44, 64);

  noStroke();
  fill(5);
  rect(width / 2 - 200, 30, 400, 140);

  tempo++;

  if (tempo < 40) {
    stroke(255, 255, 240);
    strokeWeight(4);
    randomSeed(tempo * 0.1);

    for (let i = 0; i < 15; i++) {
      let x = random(width / 2 - 200, width / 2 + 200);
      let y = random(30, 170);
      point(x, y);
    }
  }

  if (tempo > 45) {
    tempo = 0;
  }

  noStroke();
  fill(240);
  ellipse(width / 2, 100, 100, 100);

  stroke(120);
  strokeWeight(4);
  line(width / 2 - 205, 25, width / 2 + 205, 25);

  noStroke();
  fill(80, 20, 20);
  rect(width / 2 - 200, 30, 100, 140);
  rect(width / 2 + 100, 30, 100, 140);

  stroke(60, 10, 10);
  strokeWeight(2);

  line(width / 2 - 175, 30, width / 2 - 175, 170);
  line(width / 2 - 150, 30, width / 2 - 150, 170);
  line(width / 2 - 125, 30, width / 2 - 125, 170);

  line(width / 2 + 125, 30, width / 2 + 125, 170);
  line(width / 2 + 150, 30, width / 2 + 150, 170);
  line(width / 2 + 175, 30, width / 2 + 175, 170);

  stroke(80);
  line(width / 2, 30, width / 2, 170);
  line(width / 2 - 200, 100, width / 2 + 200, 100);

  noFill();
  stroke(60);
  rect(width / 2 - 200, 30, 400, 140);

  noStroke();
  fill(230);
  rect(width - 60, 120, 20, 40);

  fill(80);
  if (luzLigada) {
    rect(width - 54, 125, 8, 12);
  } else {
    rect(width - 54, 143, 8, 12);
  }

  if (!luzLigada) {
    fill(0, 0, 0, 220);
    rect(0, 0, width, height);
  }

  if (Pos > -300) {
    image(crianca, Pos, height - 220, 130, 130);

    if (!luzLigada) {
      image(fantasma, Pos + 150, height - 220, 130, 130);
    }
  }

  if (Pos > -300) {
    Pos -= 1.6;
  }
}

function mousePressed() {
  if (
    mouseX > width - 60 &&
    mouseX < width - 40 &&
    mouseY > 120 &&
    mouseY < 160
  ) {
    luzLigada = !luzLigada;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}