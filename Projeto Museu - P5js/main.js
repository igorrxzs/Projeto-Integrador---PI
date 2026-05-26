let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      speed: random(0.2, 1),
      alpha: random(80, 180)
    });
  }
}

function draw() {
  background(5, 5, 12, 40);

  desenharCorredor();
  desenharParticulas();
  desenharLuzes();
}

function desenharCorredor() {
  stroke(80, 60, 130, 120);
  strokeWeight(2);

  line(0, height, width / 2, height / 2);
  line(width, height, width / 2, height / 2);

  line(0, 0, width / 2, height / 2);
  line(width, 0, width / 2, height / 2);

  noFill();
  rectMode(CENTER);

  for (let i = 0; i < 8; i++) {
    let s = i * 90 + frameCount % 90;
    stroke(80, 60, 130, 120 - i * 10);
    rect(width / 2, height / 2, s * 2, s);
  }
}

function desenharParticulas() {
  noStroke();

  for (let p of particles) {
    fill(180, 160, 255, p.alpha);
    circle(p.x, p.y, p.size);

    p.y -= p.speed;
    p.x += sin(frameCount * 0.01 + p.y) * 0.3;

    if (p.y < 0) {
      p.y = height;
      p.x = random(width);
    }
  }
}

function desenharLuzes() {
  let brilho = map(sin(frameCount * 0.05), -1, 1, 20, 100);

  noStroke();
  fill(124, 58, 237, brilho);
  ellipse(width / 2, height / 2, 300, 120);

  fill(255, 255, 255, brilho / 3);
  ellipse(width / 2, height / 2, 120, 40);
}

function irParaSala(caminho) {
  document.getElementById("fade").style.opacity = "1";

  setTimeout(() => {
    window.location.href = caminho;
  }, 1000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}