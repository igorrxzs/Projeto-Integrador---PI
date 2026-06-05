let fase = 0;
let tempo = 0;
let tremX = 0;
let tremY = 0;

let imgJumpscare;
let audioJumpscare;

function preload() {
  imgJumpscare = loadImage("../imagens/corredorassombrado/jumpscare.jpeg");
  audioJumpscare = loadSound("../sons/jumpscare.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  tempo++;

  if (fase === 0) {
    background(0);

    fill(120, 0, 0, map(tempo, 0, 90, 0, 180));
    noStroke();
    rect(0, 0, width, height);

    stroke(90, 0, 0, 120);
    strokeWeight(10);

    for (let x = 70; x < width; x += 100) {
      line(x, 0, x, height);
    }

    line(0, height * 0.32, width, height * 0.32);
    line(0, height * 0.64, width, height * 0.64);

    noStroke();

    if (tempo > 90) {
      fase = 1;
      tempo = 0;
    }

  } else if (fase === 1) {
    background(0);

    tremX = random(-5, 5);
    tremY = random(-5, 5);

    let imgW = width;
    let imgH = width * 0.5625;

    if (imgH < height) {
      imgH = height;
      imgW = height * 1.777;
    }

    let imgX = width / 2 - imgW / 2 + tremX;
    let imgY = height / 2 - imgH / 2 + tremY;

    image(imgJumpscare, imgX, imgY, imgW, imgH);

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
      text("Clique para voltar ao corredor", width / 2, height * 0.5);
    }
  }
}

function mousePressed() {
  if (fase === 1) {
    userStartAudio();

    if (audioJumpscare) {
      audioJumpscare.stop();
      audioJumpscare.setVolume(0.8);
      audioJumpscare.play();
    }
  }

  if (fase === 2 && tempo > 60) {
    window.location.href = "corredorassombrado.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}