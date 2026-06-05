let fundo, carro, carroPolicia, sol;
let xCarro;
let xPolicia;
let tempoFarol = 0;
let nitro = 100;
let usandoNitro = false;
let podeUsarNitro = true;
let musicaGTA;

function preload() {
  fundo = loadImage("../imagens/cidade/cidade.png.jpeg");
  carro = loadImage("../imagens/cidade/carro.png-removebg-preview.png");
  carroPolicia = loadImage("../imagens/cidade/carro_policia-removebg-preview.png");
  sol = loadImage("../imagens/cidade/sun_shiny.png");
  musicaGTA = loadSound("../sons/gta_musica.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xCarro = width * 0.5;
  xPolicia = width * 0.65;
}

function tocarMusicaGTA() {
  if (!musicaGTA.isPlaying()) {
    userStartAudio();
    musicaGTA.setVolume(0.4);
    musicaGTA.loop();
  }
}

function draw() {
  tocarMusicaGTA();

  background(200);

  if (fundo) image(fundo, 0, 0, width, height);
  if (sol) image(sol, width - 130, 20, 80, 80);

  let estrada = height * 0.78;

  fill(120, 140, 180);
  noStroke();
  rect(width * 0.02, height * 0.3, width * 0.1, estrada - height * 0.3);
  fill(255, 255, 180);
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 3; i++) {
      let jy = height * 0.34 + j * height * 0.055;
      if (jy + height * 0.04 < estrada)
        rect(width * 0.03 + i * width * 0.03, jy, width * 0.02, height * 0.04);
    }
  }

  fill(150, 150, 170);
  rect(width * 0.14, height * 0.2, width * 0.08, estrada - height * 0.2);
  fill(200, 230, 255);
  for (let j = 0; j < 12; j++) {
    for (let i = 0; i < 2; i++) {
      let jy = height * 0.24 + j * height * 0.046;
      if (jy + height * 0.035 < estrada)
        rect(width * 0.155 + i * width * 0.033, jy, width * 0.018, height * 0.035);
    }
  }

  fill(220, 180, 130);
  rect(width * 0.42, height * 0.28, width * 0.1, estrada - height * 0.28);
  fill(255, 255, 150);
  for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 3; i++) {
      let jy = height * 0.32 + j * height * 0.055;
      if (jy + height * 0.04 < estrada)
        rect(width * 0.43 + i * width * 0.03, jy, width * 0.018, height * 0.04);
    }
  }

  fill(190, 120, 120);
  rect(width * 0.72, height * 0.35, width * 0.1, estrada - height * 0.35);
  fill(255, 220, 150);
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 3; i++) {
      let jy = height * 0.39 + j * height * 0.055;
      if (jy + height * 0.04 < estrada)
        rect(width * 0.73 + i * width * 0.03, jy, width * 0.018, height * 0.04);
    }
  }

  fill(100, 140, 120);
  rect(width * 0.25, height * 0.25, width * 0.09, estrada - height * 0.25);
  fill(180, 255, 200);
  for (let j = 0; j < 12; j++) {
    for (let i = 0; i < 2; i++) {
      let jy = height * 0.29 + j * height * 0.046;
      if (jy + height * 0.035 < estrada)
        rect(width * 0.265 + i * width * 0.033, jy, width * 0.018, height * 0.035);
    }
  }

  fill(160, 120, 180);
  rect(width * 0.85, height * 0.32, width * 0.1, estrada - height * 0.32);
  fill(230, 200, 255);
  for (let j = 0; j < 9; j++) {
    for (let i = 0; i < 3; i++) {
      let jy = height * 0.36 + j * height * 0.055;
      if (jy + height * 0.04 < estrada)
        rect(width * 0.86 + i * width * 0.03, jy, width * 0.018, height * 0.04);
    }
  }

  fill(70);
  noStroke();
  rect(width * 0.08, height * 0.45, width * 0.007, estrada - height * 0.45);
  fill(40);
  rect(width * 0.073, height * 0.38, width * 0.022, height * 0.08, 5);

  fill(tempoFarol >= 400 ? color(255, 0, 0) : color(80));
  ellipse(width * 0.084, height * 0.395, 12, 12);
  fill(tempoFarol >= 300 && tempoFarol < 400 ? color(255, 255, 0) : color(80));
  ellipse(width * 0.084, height * 0.415, 12, 12);
  fill(tempoFarol < 300 ? color(0, 255, 0) : color(80));
  ellipse(width * 0.084, height * 0.435, 12, 12);

  tempoFarol++;
  if (tempoFarol > 600) tempoFarol = 0;

  fill(100);
  rect(0, height * 0.78, width, height * 0.04);
  fill(60);
  rect(0, height * 0.82, width, height * 0.18);
  fill(255);
  noStroke();
  for (let i = 0; i < width; i += 120) {
    rect(i, height * 0.895, 70, 8);
  }

  if (usandoNitro) {
    nitro -= 2;
    if (nitro <= 0) {
      nitro = 0;
      usandoNitro = false;
    }
  } else {
    if (nitro < 100) nitro += 0.5;
    else {
      nitro = 100;
      podeUsarNitro = true;
    }
  }

  let velocidadeCarro = usandoNitro ? 8 : 2;
  xCarro -= velocidadeCarro;
  xPolicia -= 2;

  if (carro) image(carro, xCarro, height * 0.77, 120, 60);
  if (carroPolicia) image(carroPolicia, xPolicia, height * 0.77, 120, 60);

  let dPolicia = dist(mouseX, mouseY, xPolicia + 60, height * 0.77 + 30);
  if (dPolicia < 70) {
    fill(255, 255, 255, 200);
    noStroke();
    rect(xPolicia - 10, height * 0.77 - 30, 155, 22, 5);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(12);
    text("Clique para continuar →", xPolicia - 5, height * 0.77 - 27);
  }

  if (usandoNitro) {
    noStroke();
    for (let i = 0; i < 3; i++) {
      fill(0, 200, 255, 150);
      ellipse(xCarro + 115 + random(-5, 5), height * 0.8, 25 - i * 5, 12 - i * 2);
    }
  }

  if (xPolicia < -150) {
    xCarro = width * 0.5;
    xPolicia = width * 0.65;
  }

  let painelX = 15;
  let painelY = 15;
  let painelW = 180;
  let painelH = 40;

  fill(0, 0, 0, 180);
  noStroke();
  rect(painelX, painelY, painelW, painelH, 5);

  fill(podeUsarNitro ? color(0, 200, 0) : color(200, 0, 0));
  rect(painelX + 3, painelY + 24, map(nitro, 0, 100, 0, painelW - 6), 10, 3);

  fill(255);
  textSize(11);
  textAlign(LEFT, TOP);
  text(podeUsarNitro ? "NITRO: PRONTO! (clique no carro)" : "NITRO: RECARREGANDO..", painelX + 5, painelY + 5);
}

function mousePressed() {
  tocarMusicaGTA();

  if (mouseX > xCarro && mouseX < xCarro + 120 &&
      mouseY > height * 0.77 && mouseY < height * 0.77 + 60) {
    if (podeUsarNitro) {
      usandoNitro = true;
      podeUsarNitro = false;
    }
  }

  if (mouseX > xPolicia && mouseX < xPolicia + 120 &&
      mouseY > height * 0.77 && mouseY < height * 0.77 + 60) {
    musicaGTA.stop();
    window.location.href = "prisao.html";
  }
}

function mouseReleased() {
  usandoNitro = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}