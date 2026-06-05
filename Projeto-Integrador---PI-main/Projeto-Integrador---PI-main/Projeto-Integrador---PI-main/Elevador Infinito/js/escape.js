let floresta, crianca, fantasma;
let musicaEscape;

let posCrianca = 620;
let posFantasma = 620;
let velocidadeCrianca = 1.6;
let velocidadeFantasma = 1.6;
let fantasmaAtivado = false;

let escala = 1;

function preload() {
  floresta = loadImage("../imagens/fugadamenina/casa.jpeg");
  crianca = loadImage("../imagens/fugadamenina/meninoremovebg.png");
  fantasma = loadImage("../imagens/fugadamenina/ghost.png");

  musicaEscape = loadSound("../sons/escape.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calcularEscala();
}

function draw() {
  background(0);

  push();
  translate((width - 800 * escala) / 2, (height - 450 * escala) / 2);
  scale(escala);

  image(floresta, 0, 0, 800, 450);

  if (posCrianca > -300) {
    posCrianca -= velocidadeCrianca;
  }

  if (fantasmaAtivado && posFantasma > -300) {
    posFantasma -= velocidadeFantasma;
    image(fantasma, posFantasma, 330, 160, 120);
  }

  image(crianca, posCrianca, 350, 180, 100);

  pop();
}

function calcularEscala() {
  let escalaW = windowWidth / 800;
  let escalaH = windowHeight / 450;
  escala = max(escalaW, escalaH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcularEscala();
}

function mousePressed() {
  if (musicaEscape && !musicaEscape.isPlaying()) {
    userStartAudio();
    musicaEscape.setVolume(0.4);
    musicaEscape.loop();
  }

  if (posCrianca < 400) {
    fantasmaAtivado = true;
  }
}