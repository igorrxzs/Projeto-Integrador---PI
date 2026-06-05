let floresta, crianca, fantasma;
let posCrianca = 1050;
let posFantasma = 1400;
let velocidadeCrianca = 2.0;
let velocidadeFantasma = 0;
let fantasmaAtivado = false;
let jogoAcabou = false;

function preload() {
  floresta = loadImage("../imagens/fugadamenina/casa.jpeg");
  crianca  = loadImage("../imagens/fugadamenina/meninoremovebg.png");
  fantasma = loadImage("../imagens/fugadamenina/ghost.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  textFont("Arial");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // fundo com proporção correta, sem esticar
let imgW = floresta.width;
  let imgH = floresta.height;
  let escala = max(width / imgW, height / imgH);
  let bw = imgW * escala;
  let bh = imgH * escala;
  let bx = (width - bw) / 2;
  let by = -bh * 0.15; // empurra a imagem para cima
  image(floresta, bx, by, bw, bh);

  if (!jogoAcabou) {
    if (posCrianca > -200) {
      posCrianca -= velocidadeCrianca;
    }

    if (fantasmaAtivado) {
      if (velocidadeFantasma < velocidadeCrianca * 2) {
        velocidadeFantasma += 0.02;
      }
      if (posFantasma > -200) {
        posFantasma -= velocidadeFantasma;
      }
      let ghW = height * 0.25;
      let ghH = height * 0.30;
      image(fantasma, posFantasma, height * 0.65, ghW, ghH);
    }

    let mW = height * 0.18;
    let mH = height * 0.32;
    image(crianca, posCrianca, height * 0.62, mW, mH);

    if (!fantasmaAtivado) {
      fill(255, 255, 255, 180);
      noStroke();
      rect(width / 2 - 220, 10, 440, 36, 8);
      fill(30);
      textSize(15);
      textAlign(CENTER, CENTER);
      text("Clique para soltar o fantasma!", width / 2, 28);
    }

    if (fantasmaAtivado && posFantasma <= posCrianca + 60) {
      jogoAcabou = true;
    }

    if (posCrianca < -200) {
      jogoAcabou = true;
    }

  } else {
    fill(0, 0, 0, 160);
    rect(0, 0, width, height);
    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);

    if (posFantasma <= posCrianca + 60) {
      text("O fantasma pegou a criança!", width / 2, height / 2 - 20);
    } else {
      text("A criança escapou!", width / 2, height / 2 - 20);
    }

    textSize(18);
    fill(220);
    text("Clique para jogar de novo", width / 2, height / 2 + 30);
  }
}

function mousePressed() {
  if (jogoAcabou) {
    posCrianca        = 1050;
    posFantasma       = 1400;
    velocidadeCrianca  = 2.0;
    velocidadeFantasma = 0;
    fantasmaAtivado   = false;
    jogoAcabou        = false;
    return;
  }

  if (!fantasmaAtivado && posCrianca < width * 0.5) {
    fantasmaAtivado = true;
  }
}