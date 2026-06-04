let fundo, carro, carroPolicia, sol;

let xCarro = 600;
let xPolicia = 750;

let tempoFarol = 0;

function preload() {
  fundo = loadImage("../imagens/cidade/cidade.png.jpeg");
  carro = loadImage("../imagens/cidade/carro.png-removebg-preview.png");
  carroPolicia = loadImage("../imagens/cidade/carro_policia-removebg-preview.png");
  sol = loadImage("../imagens/cidade/sun_shiny.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(fundo, 0, 0, width, height);

  // ---------------- SOL ----------------
  image(sol, width - 150, 20, 100, 100);

  // ---------------- PRÉDIOS ----------------
  fill(150, 170, 200);
  rect(20, height - 250, 180, 200);

  fill(160, 160, 170);
  rect(220, height - 320, 120, 270);

  fill(220, 180, 130);
  rect(360, height - 270, 110, 190);

  fill(200, 130, 120);
  rect(480, height - 200, 110, 150);

  // ---------------- JANELAS ----------------
  fill(255, 255, 255, 150);

  // prédio esquerdo
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      rect(40 + i * 50, height - 230 + j * 40, 20, 20);
    }
  }

  // prédio cinza
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      rect(235 + i * 35, height - 300 + j * 40, 15, 15);
    }
  }

  // prédio amarelo
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      rect(375 + i * 35, height - 250 + j * 40, 18, 18);
    }
  }

  // prédio laranja
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rect(495 + i * 30, height - 180 + j * 35, 18, 18);
    }
  }

  // ---------------- FAROL ----------------
  tempoFarol++;
  if (tempoFarol > 600) tempoFarol = 0;

  fill(80);
  rect(50, height - 180, 10, 100);

  fill(40);
  rect(40, height - 220, 30, 50);

  if (tempoFarol < 300) fill(0, 255, 0);
  else fill(40);
  rect(47, height - 185, 15, 10);

  if (tempoFarol >= 300 && tempoFarol < 400) fill(255, 255, 0);
  else fill(40);
  rect(47, height - 200, 15, 10);

  if (tempoFarol >= 400) fill(255, 0, 0);
  else fill(40);
  rect(47, height - 215, 15, 10);

  // ---------------- ESTRADA ----------------
  fill(100);
  rect(0, height - 80, width, 20);

  fill(60);
  rect(0, height - 60, width, 60);

  fill(240);
  for (let i = 0; i < 5; i++) {
    rect(50, height - 60 + i * 12, 70, 8);
  }

  // ---------------- CARROS ----------------
  image(carro, xCarro, height - 75, 120, 60);
  image(carroPolicia, xPolicia, height - 75, 120, 60);

  xCarro -= 2;
  xPolicia -= 2;

  if (xPolicia < -120) {
    xCarro = width;
    xPolicia = width + 150;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}