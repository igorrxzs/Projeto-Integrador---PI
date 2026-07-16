let imagemDoSusto;
let somDoGrito;
let deslocamentoHorizontalDoTremor = 0;
let deslocamentoVerticalDoTremor = 0;
let tempoDecorrido = 0;
let podeTocarOGrito = true;


function preload() {
  imagemDoSusto = loadImage("../imagens/corredorassombrado/jumpscare.jpeg");
  somDoGrito = loadSound("../sons/jumpscare.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  userStartAudio();
  if (somDoGrito) {
    somDoGrito.setVolume(1.0);
    somDoGrito.play();
    podeTocarOGrito = false; 
  }
}


function draw() {
  background(0);
  tempoDecorrido++;

  // AJUSTA O TAMANHO DA IMAGEM PARA PREENCHER TODA A TELA
  let larguraImagem = width;
  let alturaImagem = width * 0.5625;

  if (alturaImagem < height) {
    alturaImagem = height;
    larguraImagem = height * 1.777;
  }

  let posicaoHorizontalImagem = width / 2 - larguraImagem / 2;
  let posicaoVerticalImagem = height / 2 - alturaImagem / 2;

  image(imagemDoSusto, posicaoHorizontalImagem, posicaoVerticalImagem, larguraImagem, alturaImagem);


  deslocamentoHorizontalDoTremor = random(-5, 5);
  deslocamentoVerticalDoTremor = random(-5, 5);


  fill(0, 0, 0, 150);
  rect(0, height * 0.38, width, height * 0.18);


  // TEXTO PRINCIPAL COM EFEITO TREMENDO
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(70);
  textStyle(BOLD);
  text("PORTA ERRADA", width / 2 + deslocamentoHorizontalDoTremor, height / 2 + deslocamentoVerticalDoTremor);


  // MANTÉM A TELA VISÍVEL POR MUITO TEMPO
  if (tempoDecorrido > 600) {
    image(imagemDoSusto, posicaoHorizontalImagem, posicaoVerticalImagem, larguraImagem, alturaImagem);
  }
}


function mousePressed() {
  userStartAudio();

  // SÓ FUNCIONA SE TIVER PARADO O GRITO
  if (somDoGrito && podeTocarOGrito) {
    somDoGrito.stop();
    somDoGrito.setVolume(1.0);
    somDoGrito.play();
    podeTocarOGrito = false; 

    somDoGrito.onended(() => {
      podeTocarOGrito = true;
    });
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}