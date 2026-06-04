let abertura = 0;
let aberta = false;

let andar = 2;
let destino = 2;

let viajando = false;
let tempoViagem = 0;
let tempo = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  aberta = true;
}

function draw() {
  tempo++;
  background(40);

  // TETO
  fill(210);
  rect(0, 0, width, 100);
  fill(255, 255, 220);
  rect(300, 23, 400, 57, 10);

  // PAREDES LATERAIS
  fill(120);
  rect(0, 100, 180, 550);
  rect(820, 100, 180, 550);
  fill(140);
  rect(20, 130, 140, 450);
  rect(840, 130, 140, 450);

  // CORRIMÃOS
  fill(200);
  rect(25, 400, 130, 12, 5);
  rect(845, 400, 130, 12, 5);

  // PAREDE DA FRENTE (só as laterais, não cobre a porta)
  fill(170);
  rect(180, 100, 50, 550);
  rect(770, 100, 50, 550);

  // MOLDURA DA PORTA
  fill(100);
  rect(230, 120, 540, 500);

  // PRÉ-VISUALIZAÇÃO (dentro da moldura, antes das portas)
  if (andar === 1) {
    desenharCorredorPrevia();
  } else if (andar === 3) {
    desenharCidadePrevia();
  } else {
    fill(60);
    rect(240, 130, 520, 480);
  }

  // CHÃO
  fill(90, 80, 70);
  rect(0, 650, width, 150);
  stroke(120);
  for (let x = 0; x < width; x += 40) line(x, 650, x, 800);
  for (let y = 650; y < 800; y += 40) line(0, y, width, y);
  noStroke();
  fill(0, 0, 0, 60);
  rect(0, 640, width, 15);

  // PORTAS (desenhadas por cima da prévia)
  fill(145);
  rect(240, 130, 260 - abertura, 480);
  fill(255, 255, 255, 35);
  rect(260, 130, 20, 480);

  fill(145);
  rect(500 + abertura, 130, 260 - abertura, 480);
  fill(255, 255, 255, 35);
  rect(520 + abertura, 130, 20, 480);

  stroke(100);
  line(500, 130, 500, 610);
  noStroke();

  // PAINEL
  fill(50);
  rect(880, 180, 80, 220, 10);

  if (andar < 3) fill(230);
  else fill(100);
  ellipse(920, 250, 40);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("↑", 920, 250);

  if (andar > 1) fill(230);
  else fill(100);
  ellipse(920, 330, 40);
  fill(0);
  text("↓", 920, 330);

  // VISOR
  fill(20);
  rect(430, 30, 140, 45, 5);
  fill(255, 0, 0);
  textSize(28);
  if (viajando) {
    if (destino > andar) text("↑", 500, 52);
    else text("↓", 500, 52);
  } else {
    text(andar, 500, 52);
  }

  // BOTÃO ENTRAR
  if (aberta && abertura >= 230 && andar !== 2) {
    fill(255, 200, 0, 220);
    noStroke();
    rect(width / 2 - 80, height - 160, 160, 40, 8);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    if (andar === 1) text("Entrar → Corredor", width / 2, height - 140);
    if (andar === 3) text("Entrar → Cidade", width / 2, height - 140);
  }

  // ABRIR / FECHAR PORTA
  if (aberta && abertura < 240) abertura += 4;
  if (!aberta && abertura > 0) abertura -= 4;

  // VIAGEM
  if (viajando && abertura <= 0) {
    tempoViagem--;
    if (tempoViagem <= 0) {
      andar = destino;
      viajando = false;
      aberta = true;
    }
  }
}

function desenharCorredorPrevia() {
  // fundo escuro do corredor
  fill(40, 45, 50);
  rect(230, 120, 540, 500);

  // chão do corredor
  fill(84, 62, 45);
  rect(230, 120 + 250, 540, 250);

  // tapete vermelho
  fill(150, 30, 30);
  rect(280, 430, 440, 130);

  // moldura dourada do tapete
  noFill();
  stroke(220, 180, 50);
  strokeWeight(3);
  rect(290, 440, 420, 110);
  noStroke();

  // luminária no teto
  fill(240, 220, 150, 180);
  ellipse(500, 145, 80, 30);
  fill(255, 255, 200, 80);
  ellipse(500, 145, 120, 50);

  // névoa escura nas bordas
  fill(0, 0, 0, 120);
  rect(230, 120, 80, 500);
  rect(690, 120, 80, 500);
}

function desenharCidadePrevia() {
  // céu azul
  fill(135, 180, 220);
  rect(230, 120, 540, 500);

  // sol
  fill(255, 220, 50);
  noStroke();
  ellipse(680, 160, 60, 60);

  // prédio 1
  fill(150, 170, 200);
  rect(260, 300, 90, 320);
  fill(200, 220, 255, 150);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 5; j++)
      rect(272 + i * 26, 315 + j * 50, 14, 20);

  // prédio 2
  fill(160, 160, 170);
  rect(370, 240, 80, 380);
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++)
      rect(382 + i * 30, 255 + j * 50, 14, 20);

  // prédio 3
  fill(220, 180, 130);
  rect(470, 280, 80, 340);
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 5; j++)
      rect(482 + i * 30, 295 + j * 50, 14, 20);

  // prédio 4
  fill(200, 130, 120);
  rect(570, 330, 80, 290);

  // estrada
  fill(80);
  rect(230, 560, 540, 60);
  fill(240);
  for (let x = 250; x < 760; x += 60)
    rect(x, 575, 35, 8);

  // névoa nas bordas
  noStroke();
  fill(0, 0, 0, 80);
  rect(230, 120, 60, 500);
  rect(710, 120, 60, 500);
}

function mousePressed() {
  // BOTÃO SUBIR
  if (mouseX > 900 && mouseX < 940 && mouseY > 230 && mouseY < 270) {
    if (andar < 3 && !viajando) {
      aberta = false;
      destino = andar + 1;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO DESCER
  if (mouseX > 900 && mouseX < 940 && mouseY > 310 && mouseY < 350) {
    if (andar > 1 && !viajando) {
      aberta = false;
      destino = andar - 1;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO ENTRAR
  if (aberta && abertura >= 230 && andar !== 2) {
    if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&
        mouseY > height - 160 && mouseY < height - 120) {
      if (andar === 1) window.location.href = "paginas/corredorassombrado.html";
      if (andar === 3) window.location.href = "paginas/cidade.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}