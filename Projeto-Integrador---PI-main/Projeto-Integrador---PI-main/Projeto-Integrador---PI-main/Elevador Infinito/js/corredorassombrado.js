let fantasma;
let crianca;
let luzLigada = true;
let posFantasmaX;
let posFantasmaY;
let velocidadeFantasma = 1.5;
let sentido = 1;

let tamFantasmaW = 220;
let tamFantasmaH = 220;

let tamCriancaW = 200;
let tamCriancaH = 200;

let musicaTerror;

function preload() {
  fantasma = loadImage('../imagens/corredorassombrado/fantasma.png');
  crianca = loadImage('../imagens/corredorassombrado/crianca.png');
  musicaTerror = loadSound('../sons/terror_musica.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  posFantasmaY = 10;
  posFantasmaX = -tamFantasmaW;
}

function tocarMusicaTerror() {
  if (!musicaTerror.isPlaying()) {
    userStartAudio();
    musicaTerror.setVolume(0.4);
    musicaTerror.loop();
  }
}

function draw() {
  tocarMusicaTerror();

  background(40, 45, 50);

  let portaW = 120;
  let portaH = 200;
  let portaEsqX = width * 0.15;
  let portaDirX = width * 0.7;
  let portaY = height * 0.25;

  let meioEntrePortas = (portaEsqX + portaW + portaDirX) / 2;
  let espacoEntrePortas = portaDirX - (portaEsqX + portaW);

  let janelaW = espacoEntrePortas * 0.92;
  let janelaH = 230;
  let janelaX = meioEntrePortas - janelaW / 2;
  let janelaY = 20;

  noStroke();
  fill(120, 20, 20);
  rect(0, height / 2, width, height / 2);

  stroke(200, 180, 80);
  strokeWeight(6);
  noFill();
  rect(20, height / 2 + 20, width - 40, height / 2 - 40);

  stroke(90, 0, 0, 80);
  strokeWeight(2);

  for (let i = 0; i < 20; i++) {
    let y = height / 2 + i * 25;
    line(0, y, width, y);
  }

  noStroke();

  fill(15, 15, 25);
  rect(janelaX, janelaY, janelaW, janelaH, 6);

  fill(255, 255, 255, 10);
  rect(janelaX + 12, janelaY + 12, janelaW - 24, janelaH - 24, 4);

  fill(180, 180, 200, 18);
  ellipse(janelaX + janelaW * 0.25, janelaY + janelaH * 0.65, janelaW * 0.45, janelaH * 0.25);
  ellipse(janelaX + janelaW * 0.55, janelaY + janelaH * 0.55, janelaW * 0.50, janelaH * 0.22);
  ellipse(janelaX + janelaW * 0.78, janelaY + janelaH * 0.72, janelaW * 0.40, janelaH * 0.20);

  noFill();
  stroke(140);
  strokeWeight(3);
  rect(janelaX, janelaY, janelaW, janelaH, 6);

  stroke(90);
  strokeWeight(2);
  line(janelaX + janelaW * 0.25, janelaY, janelaX + janelaW * 0.25, janelaY + janelaH);
  line(janelaX + janelaW * 0.50, janelaY, janelaX + janelaW * 0.50, janelaY + janelaH);
  line(janelaX + janelaW * 0.75, janelaY, janelaX + janelaW * 0.75, janelaY + janelaH);
  line(janelaX, janelaY + janelaH * 0.50, janelaX + janelaW, janelaY + janelaH * 0.50);

  noStroke();
  fill(0, 0, 0, 80);
  rect(janelaX, janelaY, janelaW, 25);
  rect(janelaX, janelaY + janelaH - 25, janelaW, 25);

  fill(140, 0, 0, 200);
  for (let i = 0; i < 8; i++) {
    rect(janelaX + i * 12, janelaY, 18, janelaH);
    rect(janelaX + janelaW - 100 + i * 12, janelaY, 18, janelaH);
  }

  fill(80, 0, 0, 120);
  for (let i = 0; i < 8; i++) {
    rect(janelaX + i * 12, janelaY, 9, janelaH);
    rect(janelaX + janelaW - 100 + i * 12, janelaY, 9, janelaH);
  }

  if (luzLigada) {
    stroke(255, 255, 240);
    strokeWeight(4);
    randomSeed(frameCount * 0.1);

    for (let i = 0; i < 12; i++) {
      let px = random(janelaX + 30, janelaX + janelaW - 30);
      let py = random(janelaY + 20, janelaY + janelaH - 20);
      point(px, py);
    }
  }

  posFantasmaX += velocidadeFantasma * sentido;
  if (posFantasmaX > width) sentido = -1;
  if (posFantasmaX < -tamFantasmaW) sentido = 1;

  noStroke();
  fill(luzLigada ? 240 : 80);
  ellipse(janelaX + janelaW / 2, janelaY + janelaH * 0.45, 130, 130);

  fill(230);
  rect(width * 0.7 + 130, height * 0.25 + 80, 20, 40);

  fill(80);
  if (luzLigada) {
    rect(width * 0.7 + 136, height * 0.25 + 85, 8, 12);
  } else {
    rect(width * 0.7 + 136, height * 0.25 + 103, 8, 12);
  }

  image(crianca, width / 2 - tamCriancaW / 2, height - tamCriancaH - 20, tamCriancaW, tamCriancaH);

  if (!luzLigada) {
    fill(0, 0, 0, 220);
    rect(0, 0, width, height);

    image(fantasma, posFantasmaX, posFantasmaY, tamFantasmaW, tamFantasmaH);
  }

  noStroke();

  fill(60, 35, 20);
  rect(portaEsqX, portaY, portaW, portaH, 5);

  fill(80, 50, 25);
  rect(portaEsqX + 10, portaY + 10, portaW - 20, portaH - 20, 3);

  fill(200, 160, 0);
  ellipse(portaEsqX + 95, portaY + 100, 14, 14);

  fill(60, 35, 20);
  rect(portaDirX, portaY, portaW, portaH, 5);

  fill(80, 50, 25);
  rect(portaDirX + 10, portaY + 10, portaW - 20, portaH - 20, 3);

  fill(200, 160, 0);
  ellipse(portaDirX + 25, portaY + 100, 14, 14);

  if (
    mouseX > portaEsqX &&
    mouseX < portaEsqX + portaW &&
    mouseY > portaY &&
    mouseY < portaY + portaH
  ) {
    fill(255, 255, 0, 40);
    rect(portaEsqX, portaY, portaW, portaH, 5);
  }

  if (
    mouseX > portaDirX &&
    mouseX < portaDirX + portaW &&
    mouseY > portaY &&
    mouseY < portaY + portaH
  ) {
    fill(255, 255, 0, 40);
    rect(portaDirX, portaY, portaW, portaH, 5);
  }
}

function mousePressed() {
  tocarMusicaTerror();

  let portaW = 120;
  let portaH = 200;
  let portaEsqX = width * 0.15;
  let portaDirX = width * 0.7;
  let portaY = height * 0.25;

  if (
    mouseX > width * 0.7 + 130 &&
    mouseX < width * 0.7 + 150 &&
    mouseY > height * 0.25 + 80 &&
    mouseY < height * 0.25 + 120
  ) {
    luzLigada = !luzLigada;
  }

  if (
    mouseX > portaEsqX &&
    mouseX < portaEsqX + portaW &&
    mouseY > portaY &&
    mouseY < portaY + portaH
  ) {
    musicaTerror.stop();
    window.location.href = "escape.html";
  }

  if (
    mouseX > portaDirX &&
    mouseX < portaDirX + portaW &&
    mouseY > portaY &&
    mouseY < portaY + portaH
  ) {
    musicaTerror.stop();
    window.location.href = "jumpscare.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  posFantasmaY = 10;
}