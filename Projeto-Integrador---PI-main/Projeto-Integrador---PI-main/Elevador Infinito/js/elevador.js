let abertura = 0;
let aberta = false;

let andar = 1;
let destino = 1;

let viajando = false;
let tempoViagem = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(40);

  // TETO
  fill(210);
  rect(0, 0, width, 100);

  fill(255, 255, 220);
  rect(300, 25, 400, 40, 10);

  // PAREDES
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

  // PAREDE DA FRENTE
  fill(170);
  rect(180, 100, 640, 550);

  // MOLDURA DA PORTA
  fill(100);
  rect(230, 120, 540, 500);

  // CHÃO
  fill(90, 80, 70);
  rect(0, 650, width, 150);

  stroke(120);
  for (let x = 0; x < width; x += 40) line(x, 650, x, 800);
  for (let y = 650; y < 800; y += 40) line(0, y, width, y);
  noStroke();

  fill(0, 0, 0, 60);
  rect(0, 640, width, 15);

  // PORTAS
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

  // BOTÃO ENTRAR (aparece quando porta está aberta)
  if (aberta && abertura >= 230) {
    fill(255, 200, 0, 220);
    rect(width / 2 - 70, height / 2 - 20, 140, 45, 8);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);

    if (andar === 2) {
      text("Entrar → Cidade", width / 2, height / 2 + 3);
    } else if (andar === 1) {
      text("Entrar → Corredor", width / 2, height / 2 + 3);
    }
  }

  // PAINEL
  fill(50);
  rect(880, 180, 80, 220, 10);

  // BOTÃO SUBIR
  fill(230);
  ellipse(920, 250, 40);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("↑", 920, 250);

  // BOTÃO DESCER
  fill(230);
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

function mousePressed() {
  // BOTÃO SUBIR
  if (mouseX > 900 && mouseX < 940 && mouseY > 230 && mouseY < 270) {
    if (andar === 1 && !viajando) {
      aberta = false;
      destino = 2;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO DESCER
  if (mouseX > 900 && mouseX < 940 && mouseY > 310 && mouseY < 350) {
    if (andar === 2 && !viajando) {
      aberta = false;
      destino = 1;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO ENTRAR
  if (aberta && abertura >= 230) {
    if (mouseX > width / 2 - 70 && mouseX < width / 2 + 70 &&
        mouseY > height / 2 - 20 && mouseY < height / 2 + 25) {
      if (andar === 2) window.location.href = "paginas/cidade.html";
      if (andar === 1) window.location.href = "paginas/corredorassombrado.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}