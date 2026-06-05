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

  let px = 0;
  let py = 0;
  let pw = width;
  let ph = height * 0.83;

  let portaW = 140 * mx;
  let portaAb = abertura * mx;

  // PAREDE PRINCIPAL
  fill(75, 80, 95);
  rect(px, py, pw, ph);
  stroke(65, 70, 85);
  strokeWeight(1.5);
  for (let y = 85 * my; y < ph; y += 65 * my) line(px, y, px + pw, y);
  for (let x = 110 * mx; x < pw; x += 85 * mx) line(x, py, x, py + ph);
  noStroke();

  // ÁREA ATRÁS DA PORTA
  if (abertura > 0) {
    fill(75, 80, 95);
    rect(px, py, portaW, ph);
    stroke(65, 70, 85);
    strokeWeight(1.5);
    for (let y = 85 * my; y < ph; y += 65 * my) line(px, y, px + portaW, y);
    noStroke();
  }

  // PORTA
  fill(75, 80, 95);
  rect(px - portaAb, py, portaW, ph);

  stroke(65, 70, 85);
  strokeWeight(1.5);
  for (let y = 85 * my; y < ph; y += 65 * my) {
    line(px - portaAb, y, px - portaAb + portaW, y);
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
  line(px - portaAb, py + ph * 0.1,  px - portaAb + portaW, py + ph * 0.1);
  line(px - portaAb, py + ph * 0.49, px - portaAb + portaW, py + ph * 0.49);
  line(px - portaAb, py + ph * 0.88, px - portaAb + portaW, py + ph * 0.88);
  noStroke();

  // FECHADURA
  fill(15, 15, 20);
  rect(px - portaAb + 110 * mx, py + ph * 0.45, 30 * mx, 80 * my, 5);
  fill(40, 45, 55);
  rect(px - portaAb + 116 * mx, py + ph * 0.48, 16 * mx, 50 * my);
  fill(200, 200, 220);
  ellipse(px - portaAb + 126 * mx, py + ph * 0.52, 8 * mx, 8 * my);

  // ANIMAÇÃO PORTA
  if (aberta && abertura < 140) abertura += 4;
  if (!aberta && abertura > 0) abertura -= 4;

  // JANELA
  fill(50, 60, 80);
  rect(width * 0.4, py + ph * 0.03, width * 0.2, ph * 0.24);
  for (let i = 0; i < 100; i += 10) {
    fill(180 - i, 200 - i / 2, 255 - i / 3, 130 - i);
    rect(width * 0.405 + i / 2, py + ph * 0.04 + i / 2, (width * 0.19 - i) , (ph * 0.22 - i));
  }
  stroke(25, 30, 45);
  strokeWeight(3);
  line(width * 0.5, py + ph * 0.03, width * 0.5, py + ph * 0.27);
  line(width * 0.4, py + ph * 0.15, width * 0.6, py + ph * 0.15);
  noStroke();

  // MOBÍLIA
  fill(60, 40, 30);
  rect(width * 0.72, height * 0.68, width * 0.18, height * 0.14);
  fill(160, 130, 100);
  rect(width * 0.72, height * 0.68, width * 0.18, height * 0.047);
  fill(70, 50, 30);
  rect(width * 0.22, height * 0.70, width * 0.13, height * 0.12);

  // PRESO
  image(imgPreso, width * 0.43, height * 0.37, width * 0.18, height * 0.50);

  // CHÃO
  fill(50, 55, 65);
  rect(px, height * 0.83, pw, height * 0.17);
  fill(60, 65, 75);
  for (let x = 0; x < width; x += 45 * mx) rect(x, height * 0.83, 22 * mx, height * 0.17);
  stroke(35, 40, 50);
  strokeWeight(3);
  line(px, height * 0.83, px + pw, height * 0.83);
  noStroke();

  // GRADES
  stroke(8, 10, 15);
  strokeWeight(5);
  for (let x = portaW; x <= width; x += 45 * mx) {
    line(x, py, x, py + ph);
    stroke(22, 25, 35);
    line(x + 1, py, x + 1, py + ph);
    stroke(8, 10, 15);
  }
  strokeWeight(7);
  line(portaW, py + ph * 0.10, width, py + ph * 0.10);
  line(portaW, py + ph * 0.31, width, py + ph * 0.31);
  line(portaW, py + ph * 0.53, width, py + ph * 0.53);
  line(portaW, py + ph * 0.75, width, py + ph * 0.75);
  noStroke();

  // POLICIAIS
  image(imgPoliciais, width * 0.20, height * 0.37, width * 0.25, height * 0.57);
}

function mousePressed() {
  let mx = width / 1000;
  let portaW = 140 * mx;
  let ph = height * 0.83;

  if (mouseX > 0 && mouseX < portaW && mouseY > 0 && mouseY < ph) {
    aberta = !aberta;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}