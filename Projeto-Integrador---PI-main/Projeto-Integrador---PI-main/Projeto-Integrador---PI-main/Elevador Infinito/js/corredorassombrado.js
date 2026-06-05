let fantasma;
let crianca;
let quintas;
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
  rect(width / 2 - 200, 30, 400, 140, 6);

  fill(255, 255, 255, 10);
  rect(width / 2 - 190, 40, 380, 120, 4);

  noFill();
  stroke(140);
  strokeWeight(3);
  rect(width / 2 - 200, 30, 400, 140, 6);

  stroke(90);
  strokeWeight(2);

  line(width / 2, 30, width / 2, 170);
  line(width / 2 - 100, 30, width / 2 - 100, 170);
  line(width / 2 + 100, 30, width / 2 + 100, 170);
  line(width / 2 - 200, 100, width / 2 + 200, 100);

  noStroke();
  fill(0, 0, 0, 80);
  rect(width / 2 - 200, 30, 400, 20);
  rect(width / 2 - 200, 150, 400, 20);

  fill(140, 0, 0, 200);

  for (let i = 0; i < 6; i++) {
    rect(width / 2 - 200 + i * 10, 30, 15, 140);
    rect(width / 2 + 135 + i * 10, 30, 15, 140);
  }

  fill(80, 0, 0, 120);

  for (let i = 0; i < 6; i++) {
    rect(width / 2 - 200 + i * 10, 30, 8, 140);
    rect(width / 2 + 135 + i * 10, 30, 8, 140);
  }

  if (luzLigada) {
    stroke(255, 255, 240);
    strokeWeight(4);
    randomSeed(frameCount * 0.1);

    for (let i = 0; i < 8; i++) {
      let px = random(width / 2 - 180, width / 2 + 180);
      let py = random(40, 160);
      point(px, py);
    }
  }

  posFantasmaX += velocidadeFantasma * sentido;
  if (posFantasmaX > width) sentido = -1;
  if (posFantasmaX < -tamFantasmaW) sentido = 1;

  noStroke();
  fill(luzLigada ? 240 : 80);
  ellipse(width / 2, 100, 100, 100);

  noStroke();
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
  rect(width * 0.15, height * 0.25, 120, 200, 5);

  fill(80, 50, 25);
  rect(width * 0.15 + 10, height * 0.25 + 10, 100, 180, 3);

  fill(200, 160, 0);
  ellipse(width * 0.15 + 95, height * 0.25 + 100, 14, 14);

  fill(60, 35, 20);
  rect(width * 0.7, height * 0.25, 120, 200, 5);

  fill(80, 50, 25);
  rect(width * 0.7 + 10, height * 0.25 + 10, 100, 180, 3);

  fill(200, 160, 0);
  ellipse(width * 0.7 + 25, height * 0.25 + 100, 14, 14);

  if (
    mouseX > width * 0.15 && 
    mouseX < width * 0.15 + 120 && 
    mouseY > height * 0.25 && 
    mouseY < height * 0.25 + 200
  ) {
    fill(255, 255, 0, 40);
    rect(width * 0.15, height * 0.25, 120, 200, 5);
  }

  if (
    mouseX > width * 0.7 && 
    mouseX < width * 0.7 + 120 && 
    mouseY > height * 0.25 && 
    mouseY < height * 0.25 + 200
  ) {
    fill(255, 255, 0, 40);
    rect(width * 0.7, height * 0.25, 120, 200, 5);
  }
}

function mousePressed() {
  tocarMusicaTerror();

  if (mouseX > width * 0.7 + 130 && mouseX < width * 0.7 + 150 && mouseY > height * 0.25 + 80 && mouseY < height * 0.25 + 120
  ) {
    luzLigada = !luzLigada;
  }

  if (mouseX > width * 0.15 && mouseX < width * 0.15 + 120 && mouseY > height * 0.25 && mouseY < height * 0.25 + 200
  ) {
    musicaTerror.stop();
    window.location.href = "escape.html";
  }

  if (mouseX > width * 0.7 && mouseX < width * 0.7 + 120 && mouseY > height * 0.25 && mouseY < height * 0.25 + 200
  ) {
    musicaTerror.stop();
    window.location.href = "jumpscare.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  posFantasmaY = 10;
}