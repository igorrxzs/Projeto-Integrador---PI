let porta = 0;
let aberta = false;
let andar = 1;
let brilho = 0;
let mostrarNumero = false;
let limitePorta = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let escala = min(width / 700, height / 700);
  let offsetX = (width - 700 * escala) / 2;
  let offsetY = (height - 700 * escala) / 2;

  push();
  translate(offsetX, offsetY);
  scale(escala);

  brilho += 0.05;
  background(255);
  noStroke();

  fill(0, 0, 50, 100);
  rect(15, 0, 670, 700);

  fill(35, 35, 55);
  rect(0, 0, 25, 700);
  rect(675, 0, 25, 700);

  fill(80 + sin(brilho) * 20);
  rect(25, 0, 6, 700);
  rect(669, 0, 6, 700);

  fill(40, 40, 60);
  rect(31, 0, 638, 120);

  fill(0, 0, 0, 40);
  rect(31, 110, 638, 10);

  fill(110, 90, 75);
  rect(31, 620, 638, 80);

  fill(0, 0, 0, 70);
  rect(31, 610, 638, 20);

  fill(160);
  rect(100, 120, 420, 500);

  fill(255, 255, 255, 20);
  rect(100, 120, 420, 500);

  fill(15);
  rect(250, 40, 140, 60, 8);

  fill(255, 60, 60);
  rect(260, 50, 120, 40, 6);

  if (mostrarNumero) {
    fill(255);
    textSize(35);
    textAlign(CENTER, CENTER);
    text(andar, 320, 70);
  }

  fill(25, 25, 45);
  rect(585, 140, 80, 340, 10);

  let y = 190;

  for (let i = 1; i <= 6; i++) {
    let mx = (mouseX - offsetX) / escala;
    let my = (mouseY - offsetY) / escala;

    let hover = mx > 610 && mx < 644 && my > y && my < y + 28;

    fill(hover ? 255 : 200 + sin(brilho * 2) * 15);
    rect(610, y, 34, 28, 4);

    fill(20);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(i, 627, y + 14);

    y += 45;
  }

  fill(150);
  rect(100 - porta, 120, 210, 500);
  rect(310 + porta, 120, 210, 500);

  fill(0, 0, 0, 40);
  rect(100 - porta + 5, 120, 205, 500);
  rect(310 + porta + 5, 120, 205, 500);

  let esquerda = 100 - porta + 210;
  let direita = 310 + porta;

  if (porta < limitePorta) {
    stroke(120);
    line(esquerda, 120, esquerda, 620);
    line(direita, 120, direita, 620);
    noStroke();
  }

  if (aberta && porta < limitePorta) porta += 2;
  if (!aberta && porta > 0) porta -= 2;

  pop();
}

function mousePressed() {
  let escala = min(width / 700, height / 700);
  let offsetX = (width - 700 * escala) / 2;
  let offsetY = (height - 700 * escala) / 2;

  let mx = (mouseX - offsetX) / escala;
  let my = (mouseY - offsetY) / escala;

  mostrarNumero = true;

  let y = 190;

  for (let i = 1; i <= 6; i++) {
    if (mx > 610 && mx < 644 && my > y && my < y + 28) {
      andar = i;

      if (i <= 2) aberta = !aberta;
      else aberta = false;
    }

    y += 45;
  }
}