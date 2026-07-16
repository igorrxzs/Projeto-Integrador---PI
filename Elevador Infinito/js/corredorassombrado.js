//VARIAVEIS
let imagemFantasma;
let imagemCrianca;
let somMusicaTerror;
let luzEstaLigada = true;

// POSIÇÃO E MOVIMENTO DO FANTASMA
let posicaoXFantasma;
let posicaoYFantasma;
let velocidadeFantasma = 1.5;
let sentidoDoMovimento; // 1 = vai para direita, -1 = vai para esquerda

// TAMANHO DAS IMAGENS
let larguraFantasma = 220;
let alturaFantasma = 220;
let larguraCrianca = 200;
let alturaCrianca = 200;

// OBJETO CENTRAL
let posicaoXObjetoCentral;
let posicaoYObjetoCentral;
let larguraObjetoCentral = 700;
let alturaObjetoCentral = 90;


function preload() {
  imagemFantasma = loadImage('../imagens/corredorassombrado/fantasma.png');
  imagemCrianca = loadImage('../imagens/corredorassombrado/crianca.png');
  somMusicaTerror = loadSound('../sons/terror_musica.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Posição inicial do fantasma
  posicaoYFantasma = 10;
  posicaoXFantasma = -larguraFantasma; // começa fora da tela à esquerda
  sentidoDoMovimento = 1;

  posicaoXObjetoCentral = (width - larguraObjetoCentral) / 2;
  posicaoYObjetoCentral = height * 0.42;
}

function tocarMusica() {
  if (!somMusicaTerror.isPlaying()) {
    userStartAudio();
    somMusicaTerror.setVolume(0.4);
    somMusicaTerror.loop();
  }
}

function draw() {
  tocarMusica();

  background(40, 45, 50);

  // PORTAS
  let larguraPorta = 120;
  let alturaPorta = 200;
  let posicaoXPortaEsquerda = width * 0.15;
  let posicaoXPortaDireita = width * 0.7;
  // Portas no final da parte cinza
  let posicaoYPortas = height / 2 - alturaPorta - 10;

  // JANELA
  let centroEntreAsPortas = (posicaoXPortaEsquerda + larguraPorta + posicaoXPortaDireita) / 2;
  let espacoEntreAsPortas = posicaoXPortaDireita - (posicaoXPortaEsquerda + larguraPorta);
  let larguraJanela = espacoEntreAsPortas * 0.92;
  let alturaJanela = 230;
  let posicaoXJanela = centroEntreAsPortas - larguraJanela / 2;
  let posicaoYJanela = 20;

  // QUADROS DADOS
  let larguraQuadro = 170;
  let alturaQuadro = 250;
  let distanciaQuadroDaPorta = 90;
  let quantoSubirOsQuadros = 60;

  // QUADRO ESQUERDO
  let posicaoXQuadroEsquerdo = posicaoXPortaEsquerda - larguraQuadro - distanciaQuadroDaPorta;
  let posicaoYQuadroEsquerdo = posicaoYPortas - quantoSubirOsQuadros;

  fill(45, 30, 15);
  rect(posicaoXQuadroEsquerdo - 12, posicaoYQuadroEsquerdo - 12, larguraQuadro + 24, alturaQuadro + 24, 6);
  fill(85, 60, 30);
  rect(posicaoXQuadroEsquerdo - 6, posicaoYQuadroEsquerdo - 6, larguraQuadro + 12, alturaQuadro + 12, 4);
  
  fill(220, 215, 200);
  rect(posicaoXQuadroEsquerdo, posicaoYQuadroEsquerdo, larguraQuadro, alturaQuadro, 3);
  
  stroke(30, 30, 30);
  strokeWeight(2.5);
  noFill();
  rect(posicaoXQuadroEsquerdo + 20, posicaoYQuadroEsquerdo + 20, larguraQuadro - 40, alturaQuadro - 40);
  line(posicaoXQuadroEsquerdo + 40, posicaoYQuadroEsquerdo + 50, posicaoXQuadroEsquerdo + larguraQuadro - 40, posicaoYQuadroEsquerdo + 50);
  line(posicaoXQuadroEsquerdo + 40, posicaoYQuadroEsquerdo + 100, posicaoXQuadroEsquerdo + larguraQuadro - 40, posicaoYQuadroEsquerdo + 100);
  line(posicaoXQuadroEsquerdo + 40, posicaoYQuadroEsquerdo + 150, posicaoXQuadroEsquerdo + larguraQuadro - 40, posicaoYQuadroEsquerdo + 150);
  circle(posicaoXQuadroEsquerdo + larguraQuadro/2, posicaoYQuadroEsquerdo + 125, 60);

  // QUADRO DIREITO
  let posicaoXQuadroDireito = posicaoXPortaDireita + larguraPorta + distanciaQuadroDaPorta;
  let posicaoYQuadroDireito = posicaoYPortas - quantoSubirOsQuadros;

  fill(45, 30, 15);
  rect(posicaoXQuadroDireito - 12, posicaoYQuadroDireito - 12, larguraQuadro + 24, alturaQuadro + 24, 6);
  fill(85, 60, 30);
  rect(posicaoXQuadroDireito - 6, posicaoYQuadroDireito - 6, larguraQuadro + 12, alturaQuadro + 12, 4);
  
  fill(220, 215, 200);
  rect(posicaoXQuadroDireito, posicaoYQuadroDireito, larguraQuadro, alturaQuadro, 3);
  
  stroke(30, 30, 30);
  strokeWeight(2.5);
  noFill();
  rect(posicaoXQuadroDireito + 20, posicaoYQuadroDireito + 20, larguraQuadro - 40, alturaQuadro - 40);
  line(posicaoXQuadroDireito + 40, posicaoYQuadroDireito + 40, posicaoXQuadroDireito + larguraQuadro - 40, posicaoYQuadroDireito + alturaQuadro - 40);
  line(posicaoXQuadroDireito + larguraQuadro - 40, posicaoYQuadroDireito + 40, posicaoXQuadroDireito + 40, posicaoYQuadroDireito + alturaQuadro - 40);
  ellipse(posicaoXQuadroDireito + larguraQuadro/2, posicaoYQuadroDireito + alturaQuadro/2, 50, 50);


  // CHÃO / PARTE DE BAIXO DA TELA
  noStroke();
  fill(120, 20, 20);
  rect(0, height / 2, width, height / 2);

  stroke(200, 180, 80);
  strokeWeight(6);
  noFill();
  rect(20, height / 2 + 20, width - 40, height / 2 - 40);

  stroke(90, 0, 0, 80);
  strokeWeight(2);
  for (let linha = 0; linha < 20; linha++) {
    let posicaoYLinha = height / 2 + linha * 25;
    line(0, posicaoYLinha, width, posicaoYLinha);
  }

  // JANELA
  noStroke();
  fill(15, 15, 25);
  rect(posicaoXJanela, posicaoYJanela, larguraJanela, alturaJanela, 6);

  fill(255, 255, 255, 10);
  rect(posicaoXJanela + 12, posicaoYJanela + 12, larguraJanela - 24, alturaJanela - 24, 4);

  // CORTINAS
  fill(140, 0, 0, 200);
  for (let parte = 0; parte < 8; parte++) {
    rect(posicaoXJanela + (parte * 12), posicaoYJanela, 12, alturaJanela);
    rect(posicaoXJanela + larguraJanela - 96 + (parte * 12), posicaoYJanela, 12, alturaJanela);
  }

  fill(80, 0, 0, 120);
  for (let parte = 0; parte < 8; parte++) {
    rect(posicaoXJanela + (parte * 12), posicaoYJanela, 6, alturaJanela);
    rect(posicaoXJanela + larguraJanela - 96 + (parte * 12), posicaoYJanela, 6, alturaJanela);
  }

  stroke(140);
  strokeWeight(3);
  noFill();
  rect(posicaoXJanela, posicaoYJanela, larguraJanela, alturaJanela, 6);

  stroke(90);
  strokeWeight(2);
  line(posicaoXJanela + larguraJanela * 0.25, posicaoYJanela, posicaoXJanela + larguraJanela * 0.25, posicaoYJanela + alturaJanela);
  line(posicaoXJanela + larguraJanela * 0.50, posicaoYJanela, posicaoXJanela + larguraJanela * 0.50, posicaoYJanela + alturaJanela);
  line(posicaoXJanela + larguraJanela * 0.75, posicaoYJanela, posicaoXJanela + larguraJanela * 0.75, posicaoYJanela + alturaJanela);
  line(posicaoXJanela, posicaoYJanela + alturaJanela * 0.50, posicaoXJanela + larguraJanela, posicaoYJanela + alturaJanela * 0.50);


  // DESENHA O OBJETO CENTRAL
  noStroke();
  fill(30, 30, 35);
  rect(posicaoXObjetoCentral, posicaoYObjetoCentral, larguraObjetoCentral, alturaObjetoCentral);
  
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(posicaoXObjetoCentral, posicaoYObjetoCentral, larguraObjetoCentral, alturaObjetoCentral);
  
  line(posicaoXObjetoCentral + 60, posicaoYObjetoCentral, posicaoXObjetoCentral + 40, posicaoYObjetoCentral + alturaObjetoCentral);
  line(posicaoXObjetoCentral + larguraObjetoCentral - 60, posicaoYObjetoCentral, posicaoXObjetoCentral + larguraObjetoCentral - 40, posicaoYObjetoCentral + alturaObjetoCentral);
  rect(posicaoXObjetoCentral + 80, posicaoYObjetoCentral + 10, larguraObjetoCentral - 160, alturaObjetoCentral - 20);


  // LUZ DA JANELA
  if (luzEstaLigada) {
    stroke(255, 255, 240);
    strokeWeight(4);
    randomSeed(frameCount * 0.1);
    for (let ponto = 0; ponto < 12; ponto++) {
      let posicaoXPonto = random(posicaoXJanela + 30, posicaoXJanela + larguraJanela - 30);
      let posicaoYPonto = random(posicaoYJanela + 20, posicaoYJanela + alturaJanela - 20);
      point(posicaoXPonto, posicaoYPonto);
    }
  }

  // MOVIMENTO DO FANTASMA
  posicaoXFantasma += velocidadeFantasma * sentidoDoMovimento;
  if (posicaoXFantasma > width) sentidoDoMovimento = -1;
  if (posicaoXFantasma < -larguraFantasma) sentidoDoMovimento = 1;

  noStroke();
  fill(luzEstaLigada ? 240 : 80);
  ellipse(posicaoXJanela + larguraJanela / 2, posicaoYJanela + alturaJanela * 0.45, 130, 130);

  // INTERRUPTOR
  fill(230);
  rect(width * 0.7 + 130, posicaoYPortas + 80, 20, 40);
  fill(80);
  rect(width * 0.7 + 136, luzEstaLigada ? posicaoYPortas + 85 : posicaoYPortas + 103, 8, 12);

  // CRIANÇA NO CHÃO
  image(imagemCrianca, width / 2 - larguraCrianca / 2, height - alturaCrianca - 20, larguraCrianca, alturaCrianca);

  // TELA PRETA QUANDO A LUZ APAGA
  if (!luzEstaLigada) {
    fill(0, 0, 0, 220);
    rect(0, 0, width, height);
    image(imagemFantasma, posicaoXFantasma, posicaoYFantasma, larguraFantasma, alturaFantasma);
  }

  // DESENHA AS PORTAS
  noStroke();
  fill(60, 35, 20);
  rect(posicaoXPortaEsquerda, posicaoYPortas, larguraPorta, alturaPorta, 5);
  fill(85, 60, 30);
  rect(posicaoXPortaEsquerda + 10, posicaoYPortas + 10, larguraPorta - 20, alturaPorta - 20, 3);
  fill(200, 160, 0);
  ellipse(posicaoXPortaEsquerda + 95, posicaoYPortas + 100, 14, 14);

  fill(60, 35, 20);
  rect(posicaoXPortaDireita, posicaoYPortas, larguraPorta, alturaPorta, 5);
  fill(85, 60, 30);
  rect(posicaoXPortaDireita + 10, posicaoYPortas + 10, larguraPorta - 20, alturaPorta - 20, 3);
  fill(200, 160, 0);
  ellipse(posicaoXPortaDireita + 25, posicaoYPortas + 100, 14, 14);
}

function mousePressed() {
  tocarMusica();

  // INTERRUPTOR
  if (mouseX > width * 0.7 + 130 && mouseX < width * 0.7 + 150 && mouseY > posicaoYPortas + 80 && mouseY < posicaoYPortas + 120) {
    luzEstaLigada = !luzEstaLigada;
  }
  
  let larguraPorta = 120;
  let alturaPorta = 200;
  let posicaoXPortaEsquerda = width * 0.15;
  let posicaoXPortaDireita = width * 0.7;
  let posicaoYPortas = height / 2 - alturaPorta - 10;

  // PORTA ESQUERDA
  if (mouseX > posicaoXPortaEsquerda && mouseX < posicaoXPortaEsquerda + larguraPorta && mouseY > posicaoYPortas && mouseY < posicaoYPortas + alturaPorta) {
    somMusicaTerror.stop();
    window.location.href = "escape.html";
  }
  // PORTA DIREITA
  if (mouseX > posicaoXPortaDireita && mouseX < posicaoXPortaDireita + larguraPorta && mouseY > posicaoYPortas && mouseY < posicaoYPortas + alturaPorta) {
    somMusicaTerror.stop();
    window.location.href = "jumpscare.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Atualiza posição do objeto quando a tela muda de tamanho
  posicaoXObjetoCentral = (width - larguraObjetoCentral) / 2;
  posicaoYObjetoCentral = height * 0.42;
}