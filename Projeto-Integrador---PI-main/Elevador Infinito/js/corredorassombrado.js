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
let larguraCrianca = 380;
let alturaCrianca = 380;

// INTERRUPTOR: MENOR E DO LADO DA PORTA DIREITA
let posicaoXInterruptor;
let posicaoYInterruptor;
let larguraInterruptor = 25;
let alturaInterruptor = 45;

// MÓVEIS NOVOS: SOFÁ E TV
let larguraSofa;
let alturaSofa = 90;
let posicaoXSofa;
let posicaoYSofa;

// ✅ TV AGORA BEM LARGA
let larguraTV = 350;
let alturaTV = 120;
let posicaoXTV;
let posicaoYTV;

// ✅ NOVO SOFÁ NA FRENTE DA CRIANÇA
let larguraSofaFrente = 400;
let alturaSofaFrente = 80;
let posicaoXSofaFrente;
let posicaoYSofaFrente;


function preload() {
  imagemFantasma = loadImage('../imagens/corredorassombrado/fantasma.png');
  imagemCrianca = loadImage('../imagens/corredorassombrado/crianca.png');
  somMusicaTerror = loadSound('../sons/terror_musica.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Posição inicial do fantasma
  posicaoYFantasma = 10;
  posicaoXFantasma = -larguraFantasma;
  sentidoDoMovimento = 1;
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

  // PORTAS ENCOSTADAS NAS PAREDES
  let larguraPorta = 120;
  let alturaPorta = 200;
  let posicaoXPortaEsquerda = 20;
  let posicaoXPortaDireita = width - larguraPorta - 20;
  let posicaoYPortas = height / 2 - alturaPorta - 10;

  // POSIÇÃO DO INTERRUPTOR: AO LADO DA PORTA DA DIREITA
  posicaoXInterruptor = posicaoXPortaDireita - larguraInterruptor - 10;
  posicaoYInterruptor = posicaoYPortas + 80;

  // JANELA
  let centroEntreAsPortas = (posicaoXPortaEsquerda + larguraPorta + posicaoXPortaDireita) / 2;
  let espacoEntreAsPortas = posicaoXPortaDireita - (posicaoXPortaEsquerda + larguraPorta);
  let larguraJanela = espacoEntreAsPortas * 0.85;
  let alturaJanela = 230;
  let posicaoXJanela = centroEntreAsPortas - larguraJanela / 2;
  let posicaoYJanela = 20;


  // CHÃO / TAPETE VERMELHO (borda em height/2)
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


  // CORTINAS NA FRENTE DA JANELA
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


  // SOFÁ E TV ENCOSTADOS NO TAPETE VERMELHO
  larguraSofa = larguraJanela * 0.9;
  posicaoXSofa = centroEntreAsPortas - larguraSofa / 2;
  posicaoYSofa = height / 2 - alturaSofa; 

  // SOFÁ
  noStroke();
  fill(45, 30, 20);
  rect(posicaoXSofa, posicaoYSofa, larguraSofa, alturaSofa, 8);
  fill(30, 20, 10);
  rect(posicaoXSofa + 15, posicaoYSofa + 10, larguraSofa - 30, alturaSofa - 20, 5);
  line(posicaoXSofa + larguraSofa/3, posicaoYSofa + 10, posicaoXSofa + larguraSofa/3, posicaoYSofa + alturaSofa - 10);
  line(posicaoXSofa + 2*larguraSofa/3, posicaoYSofa + 10, posicaoXSofa + 2*larguraSofa/3, posicaoYSofa + alturaSofa - 10);

  // ✅ TV BEM LARGA
  posicaoXTV = centroEntreAsPortas - larguraTV / 2;
  posicaoYTV = posicaoYSofa - alturaTV - 10; 

  fill(20, 20, 20);
  rect(posicaoXTV, posicaoYTV, larguraTV, alturaTV, 6);
  fill(10, 10, 10, 200);
  rect(posicaoXTV + 8, posicaoYTV + 8, larguraTV - 16, alturaTV - 16, 4);
  fill(15, 15, 15);
  rect(posicaoXTV + larguraTV/2 - 12, posicaoYTV + alturaTV, 24, 12);


  // ✅ SOFÁ NOVO NA FRENTE DA CRIANÇA
  posicaoXSofaFrente = width / 2 - larguraSofaFrente / 2;
  posicaoYSofaFrente = height - alturaCrianca - 20; // 20px acima da criança

  fill(50, 35, 25);
  rect(posicaoXSofaFrente, posicaoYSofaFrente, larguraSofaFrente, alturaSofaFrente, 8);
  fill(35, 25, 15);
  rect(posicaoXSofaFrente + 12, posicaoYSofaFrente + 8, larguraSofaFrente - 24, alturaSofaFrente - 16, 5);
  // Divisórias do assento
  line(posicaoXSofaFrente + 100, posicaoYSofaFrente + 8, posicaoXSofaFrente + 100, posicaoYSofaFrente + alturaSofaFrente - 8);
  line(posicaoXSofaFrente + 200, posicaoYSofaFrente + 8, posicaoXSofaFrente + 200, posicaoYSofaFrente + alturaSofaFrente - 8);
  line(posicaoXSofaFrente + 300, posicaoYSofaFrente + 8, posicaoXSofaFrente + 300, posicaoYSofaFrente + alturaSofaFrente - 8);


  // ✅ QUADRO PEQUENO AO LADO DA PORTA ESQUERDA
  let larguraQuadro = 60;
  let alturaQuadro = 80;
  let posicaoXQuadro = posicaoXPortaEsquerda + larguraPorta + 15;
  let posicaoYQuadro = posicaoYPortas + 30;

  // Moldura
  fill(70, 45, 20);
  rect(posicaoXQuadro - 4, posicaoYQuadro - 4, larguraQuadro + 8, alturaQuadro + 8, 3);
  // Interior do quadro
  fill(20, 20, 30);
  rect(posicaoXQuadro, posicaoYQuadro, larguraQuadro, alturaQuadro, 2);
  // Desenho simples dentro
  stroke(120, 100, 60);
  strokeWeight(1);
  line(posicaoXQuadro + 10, posicaoYQuadro + 15, posicaoXQuadro + 50, posicaoYQuadro + 65);
  line(posicaoXQuadro + 50, posicaoYQuadro + 15, posicaoXQuadro + 10, posicaoYQuadro + 65);
  noStroke();


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

  // INTERRUPTOR PEQUENO AO LADO DA PORTA
  fill(255, 255, 255);
  rect(posicaoXInterruptor, posicaoYInterruptor, larguraInterruptor, alturaInterruptor, 4);
  fill(100, 100, 100);
  rect(posicaoXInterruptor + 4, posicaoYInterruptor + 4, larguraInterruptor - 8, alturaInterruptor - 8, 2);
  fill(luzEstaLigada ? [0, 200, 0] : [200, 0, 0]);
  rect(posicaoXInterruptor + 6, luzEstaLigada ? posicaoYInterruptor + 6 : posicaoYInterruptor + 25, 13, 12, 2);


  // CRIANÇA NO CHÃO - MAIOR
  image(imagemCrianca, width / 2 - larguraCrianca / 2, height - alturaCrianca - 10, larguraCrianca, alturaCrianca);

  // EFEITO: LUZ DESLIGADA → TELA ESCURA + FANTASMA APARECE
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

  // CLIQUE NO INTERRUPTOR
  if (mouseX > posicaoXInterruptor && mouseX < posicaoXInterruptor + larguraInterruptor && mouseY > posicaoYInterruptor && mouseY < posicaoYInterruptor + alturaInterruptor) {
    luzEstaLigada = !luzEstaLigada;
  }
  
  let larguraPorta = 120;
  let alturaPorta = 200;
  let posicaoXPortaEsquerda = 20;
  let posicaoXPortaDireita = width - larguraPorta - 20;
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
}