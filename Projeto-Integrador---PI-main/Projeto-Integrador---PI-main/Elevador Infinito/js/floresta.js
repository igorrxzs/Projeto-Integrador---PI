let vagalumes = [];
let flores = [];
let tochaX, tochaY;
let tochaAtiva = false;
let tochaVida = 0;
let tempo = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 50; i++) {
    vagalumes.push({
      x: random(width),
      y: random(height * 0.2, height * 0.8),
      vx: random(-0.5, 0.5),
      vy: random(-0.3, 0.3),
      brilho: random(100, 255),
      brilhoDir: random(2) > 1 ? 1 : -1
    });
  }

  for (let i = 0; i < 30; i++) {
    flores.push({
      x: random(width),
      y: random(height * 0.82, height * 0.93),
      tamanho: random(5, 10),
      cor: int(random(3))
    });
  }
}

function draw() {
  tempo++;

  background(10, 30, 60);

  randomSeed(99);
  for (let i = 0; i < 60; i++) {
    let brilhoEst = map(sin(tempo * 0.04 + i), -1, 1, 80, 220);
    fill(255, 255, 200, brilhoEst);
    noStroke();
    ellipse(random(width), random(height * 0.55), random(1, 3));
  }

  fill(240, 230, 180);
  noStroke();
  ellipse(width * 0.82, height * 0.12, 65, 65);
  fill(10, 30, 60);
  ellipse(width * 0.82 + 14, height * 0.12 - 6, 58, 58);

  randomSeed(55);
  for (let x = 0; x < width; x += 90) {
    let h = random(height * 0.28, height * 0.42);
    fill(40, 25, 15);
    noStroke();
    rect(x + 30, height - h * 0.35, 18, h * 0.35);
    fill(20, 60, 30);
    ellipse(x + 39, height - h + h * 0.15, 75, h * 0.55);
    fill(25, 75, 35);
    ellipse(x + 39, height - h + h * 0.3, 65, h * 0.5);
    fill(30, 90, 40);
    ellipse(x + 39, height - h, 50, h * 0.35);
    fill(50, 130, 60, 180);
    ellipse(x + 39, height - h - 10, 35, 25);
  }

  randomSeed(77);
  for (let x = -30; x < width + 30; x += 120) {
    let h = random(height * 0.45, height * 0.65);
    fill(30, 18, 10);
    noStroke();
    rect(x + 40, height - h * 0.3, 24, h * 0.3);
    fill(15, 50, 20);
    ellipse(x + 52, height - h + h * 0.2, 110, h * 0.6);
    fill(18, 60, 25);
    ellipse(x + 52, height - h + h * 0.35, 95, h * 0.55);
    fill(22, 70, 30);
    ellipse(x + 52, height - h + h * 0.1, 80, h * 0.45);
    fill(35, 100, 45);
    ellipse(x + 52, height - h, 60, h * 0.3);
    fill(50, 140, 55, 160);
    ellipse(x + 52, height - h - 15, 40, 28);
  }

  fill(15, 45, 20);
  noStroke();
  rect(0, height * 0.88, width, height * 0.12);

  fill(25, 65, 28);
  ellipse(width * 0.25, height * 0.89, 500, 35);
  ellipse(width * 0.75, height * 0.91, 400, 28);

  for (let i = 0; i < 5; i++) {
    let nx = (tempo * 0.2 + i * 200) % (width + 300) - 150;
    fill(80, 160, 110, 22);
    noStroke();
    ellipse(nx, height * 0.9, 380, 55);
  }

  for (let i = 0; i < flores.length; i++) {
    let f = flores[i];
    if (f.cor === 0) fill(220, 100, 255, 210);
    else if (f.cor === 1) fill(100, 200, 255, 210);
    else fill(255, 200, 80, 210);
    noStroke();
    ellipse(f.x, f.y, f.tamanho * 1.8, f.tamanho);
    ellipse(f.x, f.y, f.tamanho, f.tamanho * 1.8);
    fill(255, 255, 150);
    ellipse(f.x, f.y, f.tamanho * 0.5, f.tamanho * 0.5);
  }

  for (let i = 0; i < vagalumes.length; i++) {
    let v = vagalumes[i];
    let d = dist(mouseX, mouseY, v.x, v.y);
    if (d < 100) {
      v.vx += (v.x - mouseX) * 0.02;
      v.vy += (v.y - mouseY) * 0.02;
    }
    v.vx = constrain(v.vx, -1.5, 1.5);
    v.vy = constrain(v.vy, -1.2, 1.2);
    v.vx += random(-0.04, 0.04);
    v.vy += random(-0.03, 0.03);
    v.x += v.vx;
    v.y += v.vy;
    if (v.x < 0) v.x = width;
    if (v.x > width) v.x = 0;
    if (v.y < height * 0.1) v.vy += 0.05;
    if (v.y > height * 0.9) v.vy -= 0.05;
    v.brilho += v.brilhoDir * 5;
    if (v.brilho > 255) v.brilhoDir = -1;
    if (v.brilho < 60) v.brilhoDir = 1;
    fill(150, 255, 160, 30);
    noStroke();
    ellipse(v.x, v.y, 22, 22);
    fill(180, 255, 180, 70);
    ellipse(v.x, v.y, 12, 12);
    fill(200, 255, 200, v.brilho);
    ellipse(v.x, v.y, 5, 5);
  }

  if (tochaAtiva) {
    tochaVida--;
    if (tochaVida <= 0) tochaAtiva = false;
    let raio = map(tochaVida, 0, 180, 0, 200);
    fill(255, 140, 30, 15);
    noStroke();
    ellipse(tochaX, tochaY, raio * 3, raio * 3);
    fill(255, 160, 50, 25);
    ellipse(tochaX, tochaY, raio * 1.8, raio * 1.8);
    fill(255, 200, 80, 40);
    ellipse(tochaX, tochaY, raio, raio);
  }
}

function mousePressed() {
  tochaX = mouseX;
  tochaY = mouseY;
  tochaAtiva = true;
  tochaVida = 180;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}