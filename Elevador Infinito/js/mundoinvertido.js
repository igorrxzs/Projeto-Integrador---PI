let fundo, criatura;
let xCriatura = -150;

function preload() {
  fundo = loadImage("../imagens/mundoinvertido/fundo.png");
  criatura = loadImage("../imagens/mundoinvertido/criatura.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // FUNDO
  image(fundo, 0, 0, width, height);

  // ESCURECIMENTO LEVE
  fill(0, 0, 0, 90);
  rect(0, 0, width, height);

  // POSTE CAÍDO DIREITO
  stroke(35);
  strokeWeight(8);
  line(width - 280, height - 80, width - 180, height - 210);

  strokeWeight(4);
  line(width - 190, height - 200, width - 120, height - 200);

  noStroke();
  fill(180, 180, 180, 60);
  ellipse(width - 120, height - 200, 25, 25);

  stroke(30);
  strokeWeight(7);
  line(160, height - 80, 240, height - 180);

  strokeWeight(3);
  line(235, height - 175, 290, height - 175);

  noStroke();

  image(criatura, xCriatura, height - 190, 130, 130);

  xCriatura += 1.2;

  if (xCriatura > width + 150) {
    xCriatura = -180;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}