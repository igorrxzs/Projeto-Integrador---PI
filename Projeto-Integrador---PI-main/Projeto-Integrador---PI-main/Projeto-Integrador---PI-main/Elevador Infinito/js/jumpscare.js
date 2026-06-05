let fase = 0;
let tempo = 0;
let tremX = 0;
let tremY = 0;
let jumpscare;

function preload() {
  jumpscare = loadImage("../imagens/corredorassombrado/jumpscare.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  tempo++;

  if (fase === 0) {
    background(0);

    fill(180, 0, 0, map(tempo, 0, 60, 0, 180));
    noStroke();
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Você escolheu a porta errada...", width / 2, height / 2);

    if (tempo > 90) {
      fase = 1;
      tempo = 0;
    }

  } else if (fase === 1) {
    background(0);

    let imgW = width;
    let imgH = width * 0.5625;

    if (imgH < height) {
      imgH = height;
      imgW = height * 1.777;
    }

    let imgX = width / 2 - imgW / 2;
    let imgY = height / 2 - imgH / 2;

    image(jumpscare, imgX, imgY, imgW, imgH);

    tremX = random(-8, 8);
    tremY = random(-8, 8);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(90);
    text("NÃO!", width / 2 + tremX, height / 2 + tremY);

    if (tempo > 80) {
      fase = 2;
      tempo = 0;
    }

  } else if (fase === 2) {
    background(0);

    fill(120, 0, 0, map(tempo, 0, 40, 0, 255));
    noStroke();
    rect(0, 0, width, height);

    stroke(100, 0, 0, map(tempo, 0, 60, 0, 180));
    strokeWeight(12);

    for (let x = 80; x < width; x += 90) {
      line(x, 0, x, height);
    }

    strokeWeight(14);
    line(0, height * 0.3, width, height * 0.3);
    line(0, height * 0.6, width, height * 0.6);
    noStroke();

    if (tempo > 40) {
      fill(255, map(tempo, 40, 100, 0, 255));
      textAlign(CENTER, CENTER);
      textSize(28);
      text("Infelizmente essa não era a saída...", width / 2, height * 0.42);

      textSize(18);
      fill(200, map(tempo, 60, 120, 0, 200));
      text("Clique para tentar novamente", width / 2, height * 0.58);
    }
  }
}

function mousePressed() {
  if (fase === 2 && tempo > 60) {
    window.location.href = "corredorassombrado.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}