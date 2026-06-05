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

  let tetoH = height * 0.13;
  let chaoY = height * 0.83;
  let paredeW = width * 0.18;
  let portaL = width * 0.23;
  let portaR = width * 0.77;
  let portaW = portaR - portaL;
  let metade = width / 2;
  let metaPorta = portaW / 2 - 10;

  let painelW = 110;
  let painelH = 200;
  let painelX = width - paredeW / 2 - painelW / 2 - 20;
  let painelY = height / 2 - painelH / 2;

  // TETO
  fill(210);
  rect(0, 0, width, tetoH);
  fill(255, 255, 220);
  rect(metade - 200, tetoH * 0.2, 400, tetoH * 0.6, 10);

  // PAREDES LATERAIS
  fill(120);
  rect(0, tetoH, paredeW, chaoY - tetoH);
  rect(width - paredeW, tetoH, paredeW, chaoY - tetoH);
  fill(140);
  rect(width * 0.02, tetoH + 30, paredeW - width * 0.04, chaoY - tetoH - 60);
  rect(width - paredeW + width * 0.02, tetoH + 30, paredeW - width * 0.04, chaoY - tetoH - 60);

  // CORRIMÃOS
  fill(200);
  rect(width * 0.025, height * 0.55, paredeW - width * 0.05, 12, 5);
  rect(width - paredeW + width * 0.025, height * 0.55, paredeW - width * 0.05, 12, 5);

  // PAREDE DA FRENTE
  fill(170);
  rect(paredeW, tetoH, portaL - paredeW, chaoY - tetoH);
  rect(portaR, tetoH, width - paredeW - portaR, chaoY - tetoH);

  // MOLDURA DA PORTA
  fill(100);
  rect(portaL, tetoH + 15, portaW, chaoY - tetoH - 15);

  // PRÉ-VISUALIZAÇÃO
  if (andar === 1) {
    desenharCorredorPrevia(portaL, tetoH + 15, portaW, chaoY - tetoH - 15);
  } else if (andar === 3) {
    desenharCidadePrevia(portaL, tetoH + 15, portaW, chaoY - tetoH - 15);
  } else {
    fill(60);
    rect(portaL + 10, tetoH + 25, portaW - 20, chaoY - tetoH - 35);
  }

  // CHÃO
  fill(90, 80, 70);
  rect(0, chaoY, width, height - chaoY);
  stroke(120);
  for (let x = 0; x < width; x += 40) line(x, chaoY, x, height);
  for (let y = chaoY; y < height; y += 40) line(0, y, width, y);
  noStroke();
  fill(0, 0, 0, 60);
  rect(0, chaoY - 15, width, 15);

  // PORTAS
  fill(145);
  rect(portaL + 10, tetoH + 25, metaPorta - abertura, chaoY - tetoH - 35);
  fill(255, 255, 255, 35);
  rect(portaL + 30, tetoH + 25, 20, chaoY - tetoH - 35);

  fill(145);
  rect(metade + abertura, tetoH + 25, metaPorta - abertura, chaoY - tetoH - 35);
  fill(255, 255, 255, 35);
  rect(metade + 20 + abertura, tetoH + 25, 20, chaoY - tetoH - 35);

  if (abertura < metaPorta - 10) {
    stroke(100);
    strokeWeight(1);
    line(metade, tetoH + 25, metade, chaoY - 10);
  }
  noStroke();

  // PAINEL
  fill(50);
  rect(painelX, painelY, painelW, painelH, 15);

  // BOTÃO SUBIR
  if (andar < 3) fill(230);
  else fill(80);
  ellipse(painelX + painelW / 2, painelY + painelH * 0.3, 60, 60);
  fill(andar < 3 ? 0 : 160);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("↑", painelX + painelW / 2, painelY + painelH * 0.3);

  // BOTÃO DESCER
  if (andar > 1) fill(230);
  else fill(80);
  ellipse(painelX + painelW / 2, painelY + painelH * 0.7, 60, 60);
  fill(andar > 1 ? 0 : 160);
  textSize(24);
  text("↓", painelX + painelW / 2, painelY + painelH * 0.7);

  // VISOR
  fill(20);
  rect(metade - 70, tetoH * 0.25, 140, 45, 5);
  fill(255, 0, 0);
  textSize(28);
  textAlign(CENTER, CENTER);
  if (viajando) {
    if (destino > andar) text("↑", metade, tetoH * 0.25 + 22);
    else text("↓", metade, tetoH * 0.25 + 22);
  } else {
    text(andar, metade, tetoH * 0.25 + 22);
  }

  // BOTÃO ENTRAR
  if (aberta && abertura >= metaPorta - 10 && andar !== 2) {
    fill(255, 200, 0, 220);
    noStroke();
    rect(metade - 90, height - 80, 180, 44, 10);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    if (andar === 1) text("Entrar → Corredor", metade, height - 58);
    if (andar === 3) text("Entrar → Cidade", metade, height - 58);
  }

  // ABRIR / FECHAR PORTA
  if (aberta && abertura < metaPorta) abertura += 4;
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

function desenharCorredorPrevia(px, py, pw, ph) {
  fill(40, 45, 50);
  rect(px, py, pw, ph);
  fill(84, 62, 45);
  rect(px, py + ph * 0.6, pw, ph * 0.4);
  fill(150, 30, 30);
  rect(px + pw * 0.08, py + ph * 0.75, pw * 0.84, ph * 0.22);
  noFill();
  stroke(220, 180, 50);
  strokeWeight(3);
  rect(px + pw * 0.1, py + ph * 0.77, pw * 0.8, ph * 0.18);
  noStroke();
  fill(240, 220, 150, 180);
  ellipse(px + pw / 2, py + ph * 0.05, 80, 30);
  fill(255, 255, 200, 80);
  ellipse(px + pw / 2, py + ph * 0.05, 120, 50);
  fill(0, 0, 0, 120);
  rect(px, py, pw * 0.12, ph);
  rect(px + pw * 0.88, py, pw * 0.12, ph);
}

function desenharCidadePrevia(px, py, pw, ph) {
  fill(135, 180, 220);
  rect(px, py, pw, ph);
  fill(255, 220, 50);
  noStroke();
  ellipse(px + pw * 0.85, py + ph * 0.1, 60, 60);

  let chaoP = py + ph * 0.78;

  fill(150, 170, 200);
  rect(px + pw * 0.05, py + ph * 0.28, pw * 0.12, chaoP - (py + ph * 0.28));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 5; j++)
      rect(px + pw * 0.06 + i * pw * 0.05, py + ph * 0.33 + j * ph * 0.08, pw * 0.04, ph * 0.06);

  fill(160, 160, 170);
  rect(px + pw * 0.22, py + ph * 0.18, pw * 0.1, chaoP - (py + ph * 0.18));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++)
      rect(px + pw * 0.23 + i * pw * 0.045, py + ph * 0.23 + j * ph * 0.08, pw * 0.035, ph * 0.06);

  fill(220, 180, 130);
  rect(px + pw * 0.45, py + ph * 0.25, pw * 0.1, chaoP - (py + ph * 0.25));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 5; j++)
      rect(px + pw * 0.46 + i * pw * 0.045, py + ph * 0.3 + j * ph * 0.08, pw * 0.035, ph * 0.06);

  fill(200, 130, 120);
  rect(px + pw * 0.65, py + ph * 0.33, pw * 0.1, chaoP - (py + ph * 0.33));

  fill(80);
  rect(px, chaoP, pw, ph * 0.08);
  fill(240);
  for (let x = px + pw * 0.04; x < px + pw; x += pw * 0.1)
    rect(x, chaoP + ph * 0.02, pw * 0.06, ph * 0.025);

  noStroke();
  fill(0, 0, 0, 80);
  rect(px, py, pw * 0.08, ph);
  rect(px + pw * 0.92, py, pw * 0.08, ph);
}

function mousePressed() {
  let paredeW = width * 0.18;
  let painelW = 110;
  let painelH = 200;
  let painelX = width - paredeW / 2 - painelW / 2 - 20;
  let painelY = height / 2 - painelH / 2;
  let portaW = width * 0.77 - width * 0.23;
  let metaPorta = portaW / 2 - 10;

  // BOTÃO SUBIR
  if (dist(mouseX, mouseY, painelX + painelW / 2, painelY + painelH * 0.3) < 30) {
    if (andar < 3 && !viajando) {
      aberta = false;
      destino = andar + 1;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO DESCER
  if (dist(mouseX, mouseY, painelX + painelW / 2, painelY + painelH * 0.7) < 30) {
    if (andar > 1 && !viajando) {
      aberta = false;
      destino = andar - 1;
      viajando = true;
      tempoViagem = 120;
    }
  }

  // BOTÃO ENTRAR
  if (aberta && abertura >= metaPorta - 10 && andar !== 2) {
    if (mouseX > width / 2 - 90 && mouseX < width / 2 + 90 &&
        mouseY > height - 80 && mouseY < height - 36) {
      if (andar === 1) window.location.href = "paginas/corredorassombrado.html";
      if (andar === 3) window.location.href = "paginas/cidade.html";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}