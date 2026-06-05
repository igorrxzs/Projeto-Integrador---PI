let fundoCeuNoite;
let fundoCeuDia;
let estaNoite = true;

let personagemCarro;
let barco;

function preload() {
  fundoCeuNoite = loadImage("../imagens/fuga/noite.png");
  fundoCeuDia = loadImage("../imagens/fuga/dia.png");
  personagemCarro = loadImage("../imagens/fuga/aura.png");
  barco = loadImage("../imagens/fuga/barco.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (estaNoite) {
    image(fundoCeuNoite, 0, 0, width, height);
  } else {
    image(fundoCeuDia, 0, 0, width, height);
  }

  if (estaNoite) {
    fill(0, 10, 40);
  } else {
    fill(20, 80, 160);
  }
  noStroke();
  rect(0, height * 0.462, width, height);

  // Ondas
  stroke(255, 255, 255, 40);
  for (let i = 0; i < width; i += 20) {
    line(i, height * 0.467, i + 15, height * 0.467);
    line(i, height * 0.567, i + 10, height * 0.567);
    line(i, height * 0.667, i + 20, height * 0.667);
    line(i, height * 0.767, i + 15, height * 0.767);
    line(i, height * 0.867, i + 10, height * 0.867);
  }
  noStroke();

  // Barco (só à noite)
  if (estaNoite) {
    image(barco, width * 0.18, height * 0.433, width * 0.17, height * 0.227);
  }

  // Píer
  fill(110, 70, 30);
  rect(width * 0.30, height * 0.733, width * 0.70, height * 0.20);

  stroke(80, 50, 20);
  for (let x = width * 0.30; x < width; x += 25) {
    line(x, height * 0.733, x, height * 0.933);
  }
  noStroke();

  fill(80, 50, 20);
  for (let x = width * 0.364; x < width; x += width * 0.10) {
    rect(x, height * 0.933, 20, height * 0.067);
  }

  // Carro — meio termo
  image(personagemCarro, width * 0.38, height * 0.467, width * 0.50, height * 0.600);
}

function mousePressed() {
  // Lua centralizada na imagem, um pouquinho pra direita
  let luaX = width * 0.555;
  let luaY = height * 0.33;
  let luaR = width * 0.06;

  let d = dist(mouseX, mouseY, luaX, luaY);
  if (d < luaR) {
    estaNoite = !estaNoite;
  }
}