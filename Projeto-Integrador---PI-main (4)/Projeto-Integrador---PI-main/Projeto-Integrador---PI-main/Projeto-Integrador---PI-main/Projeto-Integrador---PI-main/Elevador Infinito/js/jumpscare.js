// CÓDIGO FINAL - SEM IMAGENS DA PORTA - SÓ CLICA QUANDO CHEGAR
let progresso = 0;
let frame = 0;
let balancox = 0;
let balancoy = 0;

// Variáveis do susto
let imagemDoSusto;
let somDoGrito;
let deslocamentoHorizontalDoTremor = 0;
let deslocamentoVerticalDoTremor = 0;
let tempoDecorrido = 0;
let podeTocarOGrito = true;
let sustoAtivo = false;


function preload() {
  // ✅ Apenas imagem e som do susto
  imagemDoSusto = loadImage("../imagens/corredorassombrado/jumpscare.jpeg");
  somDoGrito = loadSound("../sons/jumpscare.mp3");
}


function setup() {
  // ✅ TELA CHEIA
  createCanvas(windowWidth, windowHeight);
  userStartAudio(); // Essencial para áudio funcionar no navegador
  
  if (somDoGrito) {
    somDoGrito.setVolume(1.0);
    somDoGrito.stop();
  }
  
  background(220);
}


function draw() {
  if (!sustoAtivo) {
    background(220);

    // ✅ Interpolação adaptada ao tamanho da tela
    let x1 = lerp(width * 0.3, 0, progresso) + balancox;
    let y1 = lerp(height * 0.275, 0, progresso) + balancoy;

    let x2 = lerp(width * 0.65, width, progresso) + balancox;
    let y2 = lerp(height * 0.7, height, progresso) + balancoy;

    stroke(0);
    strokeWeight(2);

    // Teto
    fill(235);
    quad(0, 0, width, 0, x2, y1, x1, y1);

    // Chão
    fill(235);
    quad(0, height, width, height, x2, y2, x1, y2);

    // Parede esquerda
    fill(245);
    quad(0, 0, x1, y1, x1, y2, 0, height);

    // Parede direita
    fill(245);
    quad(width, 0, x2, y1, x2, y2, width, height);

    // Parede do fundo
    fill(200);
    rect(x1, y1, x2 - x1, y2 - y1);

    // ✅ Porta APENAS retângulo cinza (sem imagens)
    let doorW = (x2 - x1) * 0.22;
    let doorH = (y2 - y1) * 0.55;

    let doorX = (x1 + x2) / 2 - doorW / 2;
    let doorY = y2 - doorH;

    stroke(0);
    fill(210);
    rect(doorX, doorY, doorW, doorH);

    // ✅ Animação: anda até parar na parede
    if (progresso < 1) {
      progresso += 0.003;
      frame++;
      balancox = sin(frame * 0.1) * 4;
      balancoy = abs(sin(frame * 0.1)) * 8;
    } else {
      // ✅ QUANDO CHEGOU: para de balançar
      balancox = 0;
      balancoy = 0;
    }

  } else {
    // ✅ SUSTO EM TELA CHEIA
    background(0);
    tempoDecorrido++;

    let larguraImagem = width;
    let alturaImagem = height;
    let posX = 0;
    let posY = 0;

    // Efeito de tremor
    deslocamentoHorizontalDoTremor = random(-5, 5);
    deslocamentoVerticalDoTremor = random(-5, 5);

    // Imagem ocupa tudo com tremor
    image(
      imagemDoSusto,
      posX + deslocamentoHorizontalDoTremor,
      posY + deslocamentoVerticalDoTremor,
      larguraImagem, alturaImagem
    );

    // Mantém imagem visível
    if (tempoDecorrido > 600) {
      image(imagemDoSusto, posX, posY, larguraImagem, alturaImagem);
    }
  }
}


// ✅ SÓ FUNCIONA O CLIQUE QUANDO CHEGAR NA PAREDE
function mousePressed() {
  userStartAudio();

  if (!sustoAtivo) {
    // ✅ SÓ DEIXA CLICAR SE progresso CHEGOU EM 1 (chegou na parede)
    if (progresso < 1) {
      return; // Se ainda não chegou, não faz nada
    }

    // Posição atual da porta
    let x1 = lerp(width * 0.3, 0, progresso) + balancox;
    let y1 = lerp(height * 0.275, 0, progresso) + balancoy;
    let x2 = lerp(width * 0.65, width, progresso) + balancox;
    let y2 = lerp(height * 0.7, height, progresso) + balancoy;

    let doorW = (x2 - x1) * 0.22;
    let doorH = (y2 - y1) * 0.55;
    let doorX = (x1 + x2) / 2 - doorW / 2;
    let doorY = y2 - doorH;

    // Verifica clique exato na porta
    if (
      mouseX > doorX &&
      mouseX < doorX + doorW &&
      mouseY > doorY &&
      mouseY < doorY + doorH
    ) {
      sustoAtivo = true;
      tempoDecorrido = 0;

      // Toca grito
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
  }
}


// ✅ AJUSTA TELA SE O USUÁRIO MUDAR O TAMANHO DA JANELA
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(220);
}