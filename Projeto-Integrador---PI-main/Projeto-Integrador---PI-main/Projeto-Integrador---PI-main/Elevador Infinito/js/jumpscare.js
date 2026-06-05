let jumpscare;
let somSusto;
let tremX = 0;
let tremY = 0;

let tempo = 0;

function preload() {
  jumpscare = loadImage("../imagens/corredorassombrado/jumpscare.jpeg");
  somSusto = loadSound("../sons/jumpscare.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  tempo++;

  // Ajusta a imagem para preencher a tela
  let imgW = width;
  let imgH = width * 0.5625;

  if (imgH < height) {
    imgH = height;
    imgW = height * 1.777;
  }

  let imgX = width / 2 - imgW / 2;
  let imgY = height / 2 - imgH / 2;

  image(jumpscare, imgX, imgY, imgW, imgH);

// Tremor mais suave
tremX = random(-5, 5);
tremY = random(-5, 5);

  // Fundo escuro atrás do texto para melhorar leitura
  fill(0, 0, 0, 150);
  rect(0, height * 0.38, width, height * 0.18);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(70);
  textStyle(BOLD);
  text("PORTA ERRADA", width / 2 + tremX, height / 2 + tremY);

  // Mantém a tela por bastante tempo
  if (tempo > 600) {
    image(jumpscare, imgX, imgY, imgW, imgH);
  }
}

function mousePressed() {
  userStartAudio();

  // Toca o grito sempre que clicar
  if (somSusto) {
    somSusto.stop();
    somSusto.setVolume(1.0);
    somSusto.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}