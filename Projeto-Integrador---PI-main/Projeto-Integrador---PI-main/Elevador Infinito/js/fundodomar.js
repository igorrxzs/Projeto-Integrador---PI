let estalactites = [];
let estalagmites = [];
let morcegos = [];
let particulas = [];
let tempo = 0;
let gotasTempo = 0;
let gotas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 14; i++) {
    estalactites.push({
      x: random(width),
      largura: random(15, 40),
      altura: random(60, 180)
    });
  }

  for (let i = 0; i < 10; i++) {
    estalagmites.push({
      x: random(width),
      largura: random(12, 35),
      altura: random(40, 130)
    });
  }

  for (let i = 0; i < 8; i++) {
    morcegos.push({
      x: random(width),
      y: random(height * 0.1, height * 0.4),
      vx: random(0.5, 1.5) * (random(2) > 1 ? 1 : -1),
      vy: random(-0.3, 0.3),
      asaDir: 0,
      asaVel: random(0.1, 0.2)
    });
  }
}

function draw() {
  tempo++;

  // FUNDO DA CAVERNA
  background(5, 3, 8);

  // PAREDES COM TEXTURA
  fill(25, 18, 30);
  ellipse(width * 0.1, height * 0.5, 300, height * 1.2);
  ellipse(width * 0.9, height * 0.5, 300, height * 1.2);

  fill(18, 12, 22);
  rect(0, 0, width * 0.12, height);
  rect(width * 0.88, 0, width * 0.12, height);

  // TETO
  fill(15, 10, 20);
  rect(0, 0, width, height * 0.15);
  ellipse(width * 0.3, height * 0.12, 500, 120);
  ellipse(width * 0.7, height * 0.1, 400, 100);

  // SAÍDA ILUMINADA (clicável)
  let saidaX = width / 2;
  let saidaY = height * 0.55;
  let saidaL = 100;
  let saidaA = 140;

  let brilhoSaida = map(sin(tempo * 0.03), -1, 1, 60, 120);
  fill(255, 200, 80, brilhoSaida * 0.4);
  ellipse(saidaX, saidaY, saidaL * 2.5, saidaA * 1.8);
  fill(255, 220, 120, brilhoSaida * 0.6);
  ellipse(saidaX, saidaY, saidaL * 1.8, saidaA * 1.3);

  fill(255, 240, 180, brilhoSaida);
  rect(saidaX - saidaL / 2, saidaY - saidaA / 2, saidaL, saidaA, 8);

  // arco da saída
  fill(10, 6, 15);
  rect(saidaX - saidaL / 2 - 20, saidaY - saidaA / 2 - 10, 20, saidaA + 20);
  rect(saidaX + saidaL / 2, saidaY - saidaA / 2 - 10, 20, saidaA + 20);
  ellipse(saidaX - saidaL / 2 - 10, saidaY - saidaA / 2 - 10, 30, 30);
  ellipse(saidaX + saidaL / 2 + 10, saidaY - saidaA / 2 - 10, 30, 30);

  let distSaida = dist(mouseX, mouseY, saidaX, saidaY);
  if (distSaida < 100) {
    fill(255, 240, 150, 200);
    noStroke();
    rect(saidaX - 75, saidaY - saidaA / 2 - 40, 150, 25, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Clique para sair", saidaX, saidaY - saidaA / 2 - 27);
  }

  // ESTALACTITES (teto)
  for (let i = 0; i < estalactites.length; i++) {
    let e = estalactites[i];
    fill(30, 22, 38);
    noStroke();
    triangle(
      e.x - e.largura / 2, 0,
      e.x + e.largura / 2, 0,
      e.x, e.altura
    );
    fill(40, 30, 50);
    triangle(
      e.x - e.largura / 4, 0,
      e.x + e.largura / 6, 0,
      e.x + e.largura / 8, e.altura * 0.6
    );
  }

  // ESTALAGMITES (chão)
  for (let i = 0; i < estalagmites.length; i++) {
    let e = estalagmites[i];
    fill(28, 20, 35);
    noStroke();
    triangle(
      e.x - e.largura / 2, height,
      e.x + e.largura / 2, height,
      e.x, height - e.altura
    );
  }

  // CHÃO
  fill(18, 12, 22);
  rect(0, height * 0.88, width, height * 0.12);
  fill(25, 18, 30);
  ellipse(width * 0.4, height * 0.9, 700, 50);

  // GOTAS D'ÁGUA
  gotasTempo++;
  if (gotasTempo > 20) {
    gotasTempo = 0;
    gotas.push({
      x: random(width * 0.15, width * 0.85),
      y: random(50, 150),
      vy: random(2, 5)
    });
  }

  for (let i = gotas.length - 1; i >= 0; i--) {
    let g = gotas[i];
    g.y += g.vy;
    fill(80, 100, 140, 160);
    noStroke();
    ellipse(g.x, g.y, 4, 8);
    if (g.y > height) gotas.splice(i, 1);
  }

  // MORCEGOS
  for (let i = 0; i < morcegos.length; i++) {
    let m = morcegos[i];

    let d = dist(mouseX, mouseY, m.x, m.y);
    if (d < 150) {
      m.vx += (m.x - mouseX) * 0.04;
      m.vy += (m.y - mouseY) * 0.04;
    }

    m.vx = constrain(m.vx, -3, 3);
    m.vy = constrain(m.vy, -2, 2);
    m.x += m.vx;
    m.y += m.vy;
    m.asaDir += m.asaVel;

    if (m.x > width + 30) m.x = -30;
    if (m.x < -30) m.x = width + 30;
    if (m.y < 20) m.vy += 0.1;
    if (m.y > height * 0.5) m.vy -= 0.1;

    let asaAberta = sin(m.asaDir) * 18;

    fill(20, 10, 30);
    noStroke();
    // corpo
    ellipse(m.x, m.y, 14, 10);
    // asas
    ellipse(m.x - 15 - asaAberta, m.y - 2, 20, 8);
    ellipse(m.x + 15 + asaAberta, m.y - 2, 20, 8);
    // olhos
    fill(180, 0, 0);
    ellipse(m.x - 3, m.y - 1, 3, 3);
    ellipse(m.x + 3, m.y - 1, 3, 3);
  }

  // NÉVOA NO CHÃO
  for (let i = 0; i < 4; i++) {
    let nx = (tempo * 0.15 + i * 220) % (width + 300) - 150;
    fill(40, 30, 55, 25);
    noStroke();
    ellipse(nx, height * 0.91, 400, 50);
  }
}

function mousePressed() {
  let saidaX = width / 2;
  let saidaY = height * 0.55;
  let distSaida = dist(mouseX, mouseY, saidaX, saidaY);
  if (distSaida < 100) {
    window.location.href = "corredorassombrado.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}