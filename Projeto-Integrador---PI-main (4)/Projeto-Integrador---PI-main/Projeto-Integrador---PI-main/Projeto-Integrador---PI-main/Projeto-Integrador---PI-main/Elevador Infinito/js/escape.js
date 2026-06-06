let floresta, crianca, fantasma;
let musicaEscape;

// POSIÇÕES: FANTASMA COMEÇA NO MESMO LUGAR DA CRIANÇA
let posCriancaX = 1500;
let posCriancaY = 740;
let posFantasmaX = 1500; // Mesma posição inicial
let posFantasmaY = 740;

let velocidadeCrianca = 1.6;
let velocidadeFantasma = 1.6; // Velocidade inicial
let aumentoPorClique = 0.4; // ✅ Aumenta a velocidade cada vez que clica
let fantasmaAtivado = false;

// TAMANHOS DO JEITO QUE VOCÊ DEIXOU
let larguraCrianca = 280;
let alturaCrianca = 220;
let larguraFantasma = 240;
let alturaFantasma = 200;

function preload() {
  floresta = loadImage("../imagens/fugadamenina/casa.jpeg");
  crianca = loadImage("../imagens/fugadamenina/meninoremovebg.png");
  fantasma = loadImage("../imagens/fugadamenina/ghost.png");
  musicaEscape = loadSound("../sons/escape.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tocarMusica(); // Música já começa
}

function draw() {
  background(0);

  // FUNDO OCUPANDO TELA TODA
  image(floresta, 0, 0, width, height);

  // MOVIMENTO DA CRIANÇA
  if (posCriancaX > -600) {
    posCriancaX -= velocidadeCrianca;
  }

  // MOVIMENTO DO FANTASMA
  if (fantasmaAtivado && posFantasmaX > -600) {
    let distancia = posCriancaX - posFantasmaX;

    // ✅ MESMO MAIS RÁPIDO: SE FICAR PERTO, ELE DIMINUI A VELOCIDADE PARA NÃO CHEGAR
    if (distancia < 220) { 
      posFantasmaX -= velocidadeFantasma * 0.3;
    } else {
      posFantasmaX -= velocidadeFantasma;
    }

    image(fantasma, posFantasmaX, posFantasmaY, larguraFantasma, alturaFantasma);
  }

  // DESENHA A CRIANÇA
  image(crianca, posCriancaX, posCriancaY, larguraCrianca, alturaCrianca);
}

// FUNÇÃO DA MÚSICA
function tocarMusica() {
  if (musicaEscape && !musicaEscape.isPlaying()) {
    userStartAudio();
    musicaEscape.setVolume(0.4);
    musicaEscape.loop();
  }
}

// AJUSTA SE MUDAR TAMANHO DA JANELA
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// AO CLICAR:
function mousePressed() {
  tocarMusica();

  // ✅ SE CLICOU EM CIMA DO FANTASMA
  if (mouseX > posFantasmaX && mouseX < posFantasmaX + larguraFantasma && mouseY > posFantasmaY && mouseY < posFantasmaY + alturaFantasma) {
    fantasmaAtivado = true;
    velocidadeFantasma += aumentoPorClique; // ✅ CADA CLIQUE AUMENTA A VELOCIDADE
  }

  // Ativa o fantasma quando a criança passa da posição 400 (como antes)
  if (posCriancaX < 400) {
    fantasmaAtivado = true;
  }
}