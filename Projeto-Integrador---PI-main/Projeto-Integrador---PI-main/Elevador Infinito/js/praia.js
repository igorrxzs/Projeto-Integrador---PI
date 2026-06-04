let fundo, nuvem, reflexo, sol;
let x1 = 0;
let x2 = 600;
let speed = 0.4;
let tempo = 0;
let granulos = [];

function preload() {
  fundo = loadImage("../imagens/praia/1.png");
  nuvem = loadImage("../imagens/praia/2.png");
  reflexo = loadImage("../imagens/praia/3.png");
  sol = loadImage("../imagens/praia/areia.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 800; i++) {
    granulos.push({
      x: random(0, 600),
      y: random(305, 395),
      tamanho: random(1, 3)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  let escalaX = width / 600;
  let escalaY = height / 400;

  push();
  scale(escalaX, escalaY);

  image(fundo, 0, 0, 600, 400);

  // Sol desenhado no código
  fill(255, 200, 40);
  noStroke();
  circle(300, 215, 90);

  tempo += 0.05;

  for (let i = 0; i < 600; i += 20) {
    let alturaOnda = sin(i * 0.05 + tempo) * 15;

    fill(80, 150, 190, 180);
    rect(i, 280 + alturaOnda, 20, 120);

    fill(100, 180, 210, 150);
    rect(i, 300 + alturaOnda, 20, 100);
  }

  image(reflexo, 0, 0, 600, 400);

  fill(210, 170, 140);
  rect(0, 300, 600, 100);

  fill(180, 140, 110, 150);
  for (let g of granulos) {
    rect(g.x, g.y, g.tamanho, g.tamanho);
  }

  image(nuvem, x1, -150, 600, 400);
  image(nuvem, x2, -150, 600, 400);

  x1 -= speed;
  x2 -= speed;

  if (x1 <= -600) x1 = 600;
  if (x2 <= -600) x2 = 600;

  pop();
}

function desenharCadeira(x, y) {
  fill(220, 50, 50);
  rect(x, y + 20, 40, 10);
  rect(x, y - 10, 10, 30);

  stroke(150);
  strokeWeight(2);
  line(x, y + 30, x - 10, y + 50);
  line(x + 40, y + 30, x + 50, y + 50);

  noStroke();
}