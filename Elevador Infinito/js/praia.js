let fundo;
let nuvem;
let reflexo;
let areia;

let x1 = 0;
let x2;

let speed = 0.4;
let tempo = 0;
let granulos = [];

function preload() {
  fundo = loadImage("../imagens/praia/1.png");
  nuvem = loadImage("../imagens/praia/2.png");
  reflexo = loadImage("../imagens/praia/3.png");
  areia = loadImage("../imagens/praia/areia.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  x2 = width;

  for (let i = 0; i < 800; i++) {
    granulos.push({
      x: random(width),
      y: random(height - 100, height),
      tamanho: random(1, 3)
    });
  }
}

function draw() {
  background(0);

  image(fundo, 0, 0, width, height);

  image(nuvem, x1, 0, width, height);
  image(reflexo, x1, 0, width, height);

  image(nuvem, x2, 0, width, height);
  image(reflexo, x2, 0, width, height);

  image(areia, 0, height - 120, width, 120);

  x1 -= speed;
  x2 -= speed;

  if (x1 <= -width) {
    x1 = x2 + width;
  }

  if (x2 <= -width) {
    x2 = x1 + width;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  x2 = width;
}