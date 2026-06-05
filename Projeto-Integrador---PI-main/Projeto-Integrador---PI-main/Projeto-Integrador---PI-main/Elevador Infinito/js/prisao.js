let imgPreso, imgPoliciais;
let abertura = 0;
let aberta = false;

function preload() {
  imgPreso = loadImage("../imagens/prisao/preso.png");
  imgPoliciais = loadImage("../imagens/prisao/policiais.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  background(28, 32, 45);

  let mx = width / 1000;
  let my = height / 600;

  let px = 50 * mx;
  let py = 40 * my;
  let pw = 900 * mx;
  let ph = 460 * my;

  let portaW = 140 * mx;
  let portaAb = abertura * mx;

  // PAREDE PRINCIPAL
  fill(75, 80, 95);
  rect(px, py, pw, ph);
  stroke(65, 70, 85);
  strokeWeight(1.5);
  for (let y = 85 * my; y < 500 * my; y += 65 * my) line(px, py + y - py, px + pw, py + y - py);
  for (let x = 110 * mx; x < 950 * mx; x += 85 * mx) line(px + x - px, py, px + x - px, py + ph);
  noStroke();

  // ÁREA ATRÁS DA PORTA
  if (abertura > 0) {
    fill(75, 80, 95);
    rect(px, py, portaW, ph);
    stroke(65, 70, 85);
    strokeWeight(1.5);
    for (let y = 85 * my; y < 500 * my; y += 65 * my) line(px, py + y - py, px + portaW, py + y - py);
    noStroke();
  }

  // PORTA
  fill(75, 80, 95);
  rect(px - portaAb, py, portaW, ph);

  stroke(65, 70, 85);
  strokeWeight(1.5);
  for (let y = 85 * my; y < 500 * my; y += 65 * my) {
    line(px - portaAb, py + y - py, px - portaAb + portaW, py + y - py);
  }
  for (let xl = 110 * mx; xl < 190 * mx; xl += 85 * mx) {
    line(px - portaAb + xl - px, py, px - portaAb + xl - px, py + ph);
  }

  stroke(8, 10, 15);
  strokeWeight(6);
  noFill();
  rect(px - portaAb, py, portaW, ph);

  for (let xb = 22 * mx; xb <= 118 * mx; xb += 22 * mx) {
    stroke(8, 10, 15);
    strokeWeight(8);
    line(px - portaAb + xb, py, px - portaAb + xb, py + ph);
    stroke(120, 130, 150);
    strokeWeight(3);
    line(px - portaAb + xb - 1, py, px - portaAb + xb - 1, py + ph);
  }

  stroke(8, 10, 15);
  strokeWeight(10);
  line(px - portaAb, py + 45 * my, px - portaAb + portaW, py + 45 * my);
  line(px - portaAb, py + 225 * my, px - portaAb + portaW, py + 225 * my);
  line(px - portaAb, py + 405 * my, px - portaAb + portaW, py + 405 * my);
  noStroke();

  // FECHADURA
  fill(15, 15, 20);
  rect(px - portaAb + 110 * mx, py + 210 * my, 30 * mx, 80 * my, 5);
  fill(40, 45, 55);
  rect(px - portaAb + 116 * mx, py + 225 * my, 16 * mx, 50 * my);
  fill(200, 200, 220);
  ellipse(px - portaAb + 126 * mx, py + 250 * my, 8 * mx, 8 * my);

  // ANIMAÇÃO PORTA
  if (aberta && abertura < 140) abertura += 4;
  if (!aberta && abertura > 0) abertura -= 4;

  // FAIXA LATERAL
  fill(75, 80, 95);
  noStroke();
  rect(0, 0, px, height);
  stroke(65, 70, 85);
  strokeWeight(1.5);
  line(px, py + 45 * my, px, py + ph);
  noStroke();

  // JANELA
  fill(50, 60, 80);
  rect(400 * mx, py + 15 * my, 200 * mx, 140 * my);
  for (let i = 0; i < 100; i += 10) {
    fill(180 - i, 200 - i / 2, 255 - i / 3, 130 - i);
    rect(405 * mx + i / 2, py + 20 * my + i / 2, (190 - i) * mx, (130 - i) * my);
  }
  stroke(25, 30, 45);
  strokeWeight(3);
  line(500 * mx, py + 15 * my, 500 * mx, py + 155 * my);
  line(400 * mx, py + 85 * my, 600 * mx, py + 85 * my);
  noStroke();

  // MOBÍLIA
  fill(60, 40, 30);
  rect(720 * mx, 410 * my, 180 * mx, 85 * my);
  fill(160, 130, 100);
  rect(720 * mx, 410 * my, 180 * mx, 28 * my);
  fill(70, 50, 30);
  rect(220 * mx, 420 * my, 130 * mx, 70 * my);

  // PRESO
  image(imgPreso, 430 * mx, 220 * my, 180 * mx, 300 * my);

  // CHÃO
  fill(50, 55, 65);
  rect(px, 500 * my, pw, 100 * my);
  fill(60, 65, 75);
  for (let x = 50 * mx; x < 950 * mx; x += 45 * mx) rect(x, 500 * my, 22 * mx, 100 * my);
  stroke(35, 40, 50);
  strokeWeight(3);
  line(px, 500 * my, px + pw, 500 * my);
  noStroke();

  // GRADES
  stroke(8, 10, 15);
  strokeWeight(5);
  for (let x = 190 * mx; x <= 900 * mx; x += 45 * mx) {
    line(x, py, x, py + ph);
    stroke(22, 25, 35);
    line(x + 1, py, x + 1, py + ph);
    stroke(8, 10, 15);
  }
  strokeWeight(7);
  line(190 * mx, py + 45 * my, 900 * mx, py + 45 * my);
  line(190 * mx, py + 180 * my, 900 * mx, py + 180 * my);
  line(190 * mx, py + 310 * my, 900 * mx, py + 310 * my);
  line(190 * mx, py + 440 * my, 900 * mx, py + 440 * my);
  noStroke();

  // POLICIAIS
  image(imgPoliciais, 200 * mx, 220 * my, 250 * mx, 340 * my);
}

function mousePressed() {
  let mx = width / 1000;
  let my = height / 600;
  let px = 50 * mx;
  let py = 40 * my;
  let portaW = 140 * mx;
  let ph = 460 * my;

  if (mouseX > px && mouseX < px + portaW && mouseY > py && mouseY < py + ph) {
    aberta = !aberta;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}