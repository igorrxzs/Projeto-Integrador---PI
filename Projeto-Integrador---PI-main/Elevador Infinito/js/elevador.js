// Variáveis principais
let aberturaDasPortas = 0;
let portasEstaoAbertas = false;
let andarAtualDoElevador = 2;
let andarDestinoDoElevador = 2;
let elevadorEstaSeMovendo = false;
let tempoParaChegarAoDestino = 0;
let somDoElevador;

// Carrega arquivos antes de começar
function preload() {
  somDoElevador = loadSound("sons/elevador.mp3");
}

// Configurações iniciais
function setup() {
  createCanvas(windowWidth, windowHeight);
  somDoElevador.setVolume(0.4);
  somDoElevador.loop();
}

// Função principal: desenha e atualiza tudo
function draw() {
  background(40);

  // Calcula todas as medidas usadas no projeto
  let medidas = calcularMedidas();
  let {
    alturaDoTeto,
    alturaDoChao,
    alturaInternaDoElevador,
    larguraDasParedesLaterais,
    posicaoXInicioPortas,
    posicaoXFimPortas,
    larguraTotalDasPortas,
    centroDaTela,
    metadeDaLarguraDasPortas,
    larguraDoPainelDeBotoes,
    alturaDoPainelDeBotoes,
    posicaoXDoPainel,
    posicaoYDoPainel,
    tamanhoDosBotoes,
    espacoEntreOsBotoes
  } = medidas;

  // Desenha cada parte do elevador
  desenharTeto(alturaDoTeto);
  desenharParedesLaterais(alturaDoTeto, alturaInternaDoElevador, larguraDasParedesLaterais);
  desenharCorrimao(larguraDasParedesLaterais);
  desenharParedesDaFrente(alturaDoTeto, alturaInternaDoElevador, larguraDasParedesLaterais, posicaoXInicioPortas, posicaoXFimPortas);
  
  // FUNDO SÓ APARECE QUANDO A PORTA ESTÁ FECHADA (SEM SOBRA)
  if (aberturaDasPortas <= 0) {
    desenharFundoAtrasDasPortas(posicaoXInicioPortas, alturaDoTeto, larguraTotalDasPortas, alturaInternaDoElevador);
  }

  // LUZ COM PAINEL DO ANDAR EXATAMENTE NO MEIO
  desenharLuzComPainelCentralizado(centroDaTela, alturaDoTeto);

  // Mostra o que está fora do elevador quando as portas abrem
  if (portasEstaoAbertas || aberturaDasPortas > 0) {
    if (andarAtualDoElevador === 1) desenharCorredor(posicaoXInicioPortas, alturaDoTeto, larguraTotalDasPortas, alturaInternaDoElevador);
    if (andarAtualDoElevador === 3) desenharCidade(posicaoXInicioPortas, alturaDoTeto, larguraTotalDasPortas, alturaInternaDoElevador);
  }

  // CHÃO DENTRO DO ELEVADOR COM A MESMA TEXTURA EM TODOS OS ANDARES
  desenharChaoDentroDoElevador(alturaDoChao);

  desenharPortasDoElevador(posicaoXInicioPortas, alturaDoTeto, metadeDaLarguraDasPortas, centroDaTela, alturaInternaDoElevador);
  desenharDivisoriaDoMeioDasPortas(centroDaTela, aberturaDasPortas, alturaDoTeto, alturaDoChao, metadeDaLarguraDasPortas);
  desenharPainelDeBotoes(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainelDeBotoes, alturaDoPainelDeBotoes);
  desenharBotoesDeControle(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainelDeBotoes, tamanhoDosBotoes, espacoEntreOsBotoes);

  // Atualiza movimento e animações
  atualizarAberturaDasPortas(metadeDaLarguraDasPortas);
  atualizarMovimentoDoElevador();
}

// ------------------------------
// CÁLCULO DE MEDIDAS
// ------------------------------
function calcularMedidas() {
  let alturaDoTeto = height * 0.13;
  let alturaDoChao = height * 0.87;
  let alturaInternaDoElevador = alturaDoChao - alturaDoTeto;
  let larguraDasParedesLaterais = width * 0.15;

  let posicaoXInicioPortas = larguraDasParedesLaterais;
  let posicaoXFimPortas = width - larguraDasParedesLaterais;
  let larguraTotalDasPortas = posicaoXFimPortas - posicaoXInicioPortas;
  let centroDaTela = width / 2;
  let metadeDaLarguraDasPortas = larguraTotalDasPortas / 2;

  let larguraDoPainelDeBotoes = width * 0.07;
  let alturaDoPainelDeBotoes = height * 0.22;
  let posicaoXDoPainel = width - larguraDasParedesLaterais/2 - larguraDoPainelDeBotoes/2 - width * 0.01;
  let posicaoYDoPainel = height/2 - alturaDoPainelDeBotoes/2;
  let tamanhoDosBotoes = larguraDoPainelDeBotoes * 0.4;
  let espacoEntreOsBotoes = alturaDoPainelDeBotoes * 0.3;

  return {
    alturaDoTeto,
    alturaDoChao,
    alturaInternaDoElevador,
    larguraDasParedesLaterais,
    posicaoXInicioPortas,
    posicaoXFimPortas,
    larguraTotalDasPortas,
    centroDaTela,
    metadeDaLarguraDasPortas,
    larguraDoPainelDeBotoes,
    alturaDoPainelDeBotoes,
    posicaoXDoPainel,
    posicaoYDoPainel,
    tamanhoDosBotoes,
    espacoEntreOsBotoes
  };
}

// ------------------------------
// FUNÇÕES DE DESENHO
// ------------------------------
function desenharTeto(alturaDoTeto) {
  fill(210);
  rect(0, 0, width, alturaDoTeto);
}

// LUZ COM O PAINEL DO ANDAR BEM NO MEIO
function desenharLuzComPainelCentralizado(centroDaTela, alturaDoTeto) {
  // Luz principal
  fill(255, 255, 220);
  let larguraLuz = width * 0.3;
  let alturaLuz = alturaDoTeto * 0.45;
  rect(centroDaTela - larguraLuz/2, alturaDoTeto * 0.2, larguraLuz, alturaLuz, 8);

  // Painel do andar CENTRALIZADO dentro da luz
  let tamanhoPainel = width * 0.08;
  fill(20);
  rect(centroDaTela - tamanhoPainel/2, alturaDoTeto * 0.25, tamanhoPainel, alturaLuz * 0.8, 6);
  stroke(60); 
  strokeWeight(1);
  rect(centroDaTela - tamanhoPainel/2, alturaDoTeto * 0.25, tamanhoPainel, alturaLuz * 0.8, 6);
  noStroke();

  // Número/Seta do andar
  fill(255, 0, 0);
  textSize(alturaLuz * 0.7);
  textAlign(CENTER, CENTER);
  if (elevadorEstaSeMovendo) {
    text(andarDestinoDoElevador > andarAtualDoElevador ? "↑" : "↓", centroDaTela, alturaDoTeto * 0.2 + alturaLuz/2);
  } else {
    text(andarAtualDoElevador, centroDaTela, alturaDoTeto * 0.2 + alturaLuz/2);
  }
}

function desenharParedesLaterais(alturaDoTeto, alturaInternaDoElevador, larguraDasParedesLaterais) {
  fill(120);
  rect(0, alturaDoTeto, larguraDasParedesLaterais, alturaInternaDoElevador);
  rect(width - larguraDasParedesLaterais, alturaDoTeto, larguraDasParedesLaterais, alturaInternaDoElevador);
  fill(140);
  rect(width * 0.02, alturaDoTeto + height * 0.025, larguraDasParedesLaterais - width * 0.04, alturaInternaDoElevador - height * 0.05);
  rect(width - larguraDasParedesLaterais + width * 0.02, alturaDoTeto + height * 0.025, larguraDasParedesLaterais - width * 0.04, alturaInternaDoElevador - height * 0.05);
}

function desenharCorrimao(larguraDasParedesLaterais) {
  fill(200);
  rect(width * 0.02, height * 0.55, larguraDasParedesLaterais - width * 0.04, height * 0.015, 5);
  rect(width - larguraDasParedesLaterais + width * 0.02, height * 0.55, larguraDasParedesLaterais - width * 0.04, height * 0.015, 5);
}

function desenharParedesDaFrente(alturaDoTeto, alturaInternaDoElevador, larguraDasParedesLaterais, posicaoXInicioPortas, posicaoXFimPortas) {
  fill(170);
  rect(larguraDasParedesLaterais, alturaDoTeto, posicaoXInicioPortas - larguraDasParedesLaterais, alturaInternaDoElevador);
  rect(posicaoXFimPortas, alturaDoTeto, width - larguraDasParedesLaterais - posicaoXFimPortas, alturaInternaDoElevador);
}

function desenharFundoAtrasDasPortas(posicaoXInicioPortas, alturaDoTeto, larguraTotalDasPortas, alturaInternaDoElevador) {
  fill(100);
  rect(posicaoXInicioPortas, alturaDoTeto, larguraTotalDasPortas, alturaInternaDoElevador);
}

// CHÃO DENTRO DO ELEVADOR - MESMA TEXTURA DE QUADRADINHOS PARA TODOS OS ANDARES
function desenharChaoDentroDoElevador(alturaDoChao) {
  // Cor base do chão
  fill(80, 80, 80);
  rect(0, alturaDoChao, width, height - alturaDoChao);

  // Grade de quadradinhos
  let tamanhoQuadrado = width * 0.04;
  fill(60, 60, 60);
  noStroke();
  
  for (let x = 0; x < width; x += tamanhoQuadrado) {
    for (let y = alturaDoChao; y < height; y += tamanhoQuadrado) {
      rect(x, y, tamanhoQuadrado - 2, tamanhoQuadrado - 2);
    }
  }

  // Faixa escura na borda
  fill(30, 30, 30, 150);
  rect(0, alturaDoChao - height * 0.015, width, height * 0.015);
}

function desenharPortasDoElevador(posicaoXInicioPortas, alturaDoTeto, metadeDaLarguraDasPortas, centroDaTela, alturaInternaDoElevador) {
  noStroke();
  fill(145);
  rect(posicaoXInicioPortas, alturaDoTeto, metadeDaLarguraDasPortas - aberturaDasPortas, alturaInternaDoElevador);
  rect(centroDaTela + aberturaDasPortas, alturaDoTeto, metadeDaLarguraDasPortas - aberturaDasPortas, alturaInternaDoElevador);
}

function desenharDivisoriaDoMeioDasPortas(centroDaTela, aberturaDasPortas, alturaDoTeto, alturaDoChao, metadeDaLarguraDasPortas) {
  stroke(100);
  strokeWeight(2);
  let posicaoDaLinha = centroDaTela + aberturaDasPortas;
  if (aberturaDasPortas < metadeDaLarguraDasPortas) {
    line(posicaoDaLinha, alturaDoTeto, posicaoDaLinha, alturaDoChao);
  }
  noStroke();
}

function desenharPainelDeBotoes(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainel, alturaDoPainel) {
  fill(50);
  rect(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainel, alturaDoPainel, 10);
  stroke(80);
  strokeWeight(1.5);
  rect(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainel, alturaDoPainel, 10);
  noStroke();
}

function desenharBotoesDeControle(posicaoXDoPainel, posicaoYDoPainel, larguraDoPainel, tamanhoDosBotoes, espacoEntreOsBotoes) {
  textAlign(CENTER, CENTER);

  // Botão SUBIR → VAI DIRETO PRO 3º ANDAR
  let posicaoYBotaoSubir = posicaoYDoPainel + espacoEntreOsBotoes * 0.8;
  if (andarAtualDoElevador !== 3) fill(230); else fill(80);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoSubir, tamanhoDosBotoes, tamanhoDosBotoes);
  stroke(andarAtualDoElevador !== 3 ? 0 : 100); strokeWeight(1);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoSubir, tamanhoDosBotoes, tamanhoDosBotoes);
  noStroke();
  fill(andarAtualDoElevador !== 3 ? 0 : 160);
  textSize(tamanhoDosBotoes * 0.5);
  text("↑", posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoSubir);

  // Botão FECHAR
  let posicaoYBotaoFechar = posicaoYDoPainel + espacoEntreOsBotoes * 1.8;
  fill(portasEstaoAbertas ? 230 : 80);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoFechar, tamanhoDosBotoes, tamanhoDosBotoes);
  stroke(portasEstaoAbertas ? 0 : 100); strokeWeight(1);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoFechar, tamanhoDosBotoes, tamanhoDosBotoes);
  noStroke();
  fill(portasEstaoAbertas ? 0 : 160);
  textSize(tamanhoDosBotoes * 0.4);
  text("✕", posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoFechar);

  // Botão DESCER → VAI DIRETO PRO 1º ANDAR
  let posicaoYBotaoDescer = posicaoYDoPainel + espacoEntreOsBotoes * 2.8;
  if (andarAtualDoElevador !== 1) fill(230); else fill(80);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoDescer, tamanhoDosBotoes, tamanhoDosBotoes);
  stroke(andarAtualDoElevador !== 1 ? 0 : 100); strokeWeight(1);
  ellipse(posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoDescer, tamanhoDosBotoes, tamanhoDosBotoes);
  noStroke();
  fill(andarAtualDoElevador !== 1 ? 0 : 160);
  textSize(tamanhoDosBotoes * 0.5);
  text("↓", posicaoXDoPainel + larguraDoPainel/2, posicaoYBotaoDescer);
}

// ------------------------------
// CENÁRIOS EXTERNOS
// ------------------------------
function desenharCorredor(px, py, pw, ph) {
  fill(40, 45, 50); rect(px, py, pw, ph);
  fill(84, 62, 45); rect(px, py + ph * 0.6, pw, ph * 0.4);
  fill(150, 30, 30); rect(px + pw * 0.08, py + ph * 0.75, pw * 0.84, ph * 0.22);
  noFill(); stroke(220, 180, 50); strokeWeight(pw * 0.018);
  rect(px + pw * 0.1, py + ph * 0.77, pw * 0.8, ph * 0.18); noStroke();
  fill(240, 220, 150, 180); ellipse(px + pw/2, py + ph * 0.05, pw * 0.22, ph * 0.08);
  fill(255, 255, 200, 80); ellipse(px + pw/2, py + ph * 0.05, pw * 0.32, ph * 0.13);
  fill(0, 0, 0, 120); rect(px, py, pw * 0.12, ph); rect(px + pw * 0.88, py, pw * 0.12, ph);
}

function desenharCidade(px, py, pw, ph) {
  fill(135, 180, 220); rect(px, py, pw, ph);
  fill(255, 220, 50); noStroke();
  let tamanhoDoSol = min(pw, ph) * 0.18;
  ellipse(px + pw - tamanhoDoSol/2 - pw*0.05, py + tamanhoDoSol/2 + ph*0.05, tamanhoDoSol, tamanhoDoSol);

  let alturaDoChaoDaCidade = py + ph * 0.78;
  fill(150, 170, 200); rect(px + pw * 0.05, py + ph * 0.28, pw * 0.12, alturaDoChaoDaCidade - (py + ph * 0.28));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 5; j++) rect(px + pw * 0.06 + i * pw * 0.05, py + ph * 0.33 + j * ph * 0.08, pw * 0.04, ph * 0.06);

  fill(160, 160, 170); rect(px + pw * 0.22, py + ph * 0.18, pw * 0.1, alturaDoChaoDaCidade - (py + ph * 0.18));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 6; j++) rect(px + pw * 0.23 + i * pw * 0.045, py + ph * 0.23 + j * ph * 0.08, pw * 0.035, ph * 0.06);

  fill(220, 180, 130); rect(px + pw * 0.45, py + ph * 0.25, pw * 0.1, alturaDoChaoDaCidade - (py + ph * 0.25));
  fill(200, 220, 255, 150);
  for (let i = 0; i < 2; i++) for (let j = 0; j < 5; j++) rect(px + pw * 0.46 + i * pw * 0.045, py + ph * 0.3 + j * ph * 0.08, pw * 0.035, ph * 0.06);

  fill(200, 130, 120); rect(px + pw * 0.65, py + ph * 0.33, pw * 0.1, alturaDoChaoDaCidade - (py + ph * 0.33));
  fill(80); rect(px, alturaDoChaoDaCidade, pw, ph * 0.08);
  fill(240);
  for (let x = px + pw * 0.04; x < px + pw; x += pw * 0.1) rect(x, alturaDoChaoDaCidade + ph * 0.02, pw * 0.06, ph * 0.025);

  noStroke(); fill(0, 0, 0, 80); rect(px, py, pw * 0.08, ph); rect(px + pw * 0.92, py, pw * 0.08, ph);
}

// ------------------------------
// ATUALIZAÇÕES DE MOVIMENTO
// ------------------------------
function atualizarAberturaDasPortas(metadeDaLarguraDasPortas) {
  if (portasEstaoAbertas && aberturaDasPortas < metadeDaLarguraDasPortas) aberturaDasPortas += width * 0.004;
  if (!portasEstaoAbertas && aberturaDasPortas > 0) aberturaDasPortas -= width * 0.004;
}

function atualizarMovimentoDoElevador() {
  if (elevadorEstaSeMovendo && aberturaDasPortas <= width * 0.001) {
    tempoParaChegarAoDestino--;
    if (tempoParaChegarAoDestino <= 0) {
      andarAtualDoElevador = andarDestinoDoElevador;
      elevadorEstaSeMovendo = false;
      portasEstaoAbertas = true;
    }
  }
}

// ------------------------------
// INTERAÇÃO COM CLIQUES
// ------------------------------
function mousePressed() {
  userStartAudio();
  let medidas = calcularMedidas();
  let {
    posicaoXDoPainel,
    posicaoYDoPainel,
    larguraDoPainelDeBotoes,
    tamanhoDosBotoes,
    espacoEntreOsBotoes,
    posicaoXInicioPortas,
    posicaoXFimPortas,
    metadeDaLarguraDasPortas,
    alturaDoTeto,
    alturaDoChao
  } = medidas;

  let posicaoYBotaoSubir = posicaoYDoPainel + espacoEntreOsBotoes * 0.8;
  let posicaoYBotaoFechar = posicaoYDoPainel + espacoEntreOsBotoes * 1.8;
  let posicaoYBotaoDescer = posicaoYDoPainel + espacoEntreOsBotoes * 2.8;

  // ✅ BOTÃO SUBIR → VAI DIRETO PRO 3º ANDAR
  if (dist(mouseX, mouseY, posicaoXDoPainel + larguraDoPainelDeBotoes/2, posicaoYBotaoSubir) < tamanhoDosBotoes/2) {
    if (andarAtualDoElevador !== 3 && !elevadorEstaSeMovendo) {
      portasEstaoAbertas = false;
      andarDestinoDoElevador = 3; // Sempre vai pro 3
      elevadorEstaSeMovendo = true;
      tempoParaChegarAoDestino = 120;
    }
    return;
  }

  // Clique no botão FECHAR
  if (dist(mouseX, mouseY, posicaoXDoPainel + larguraDoPainelDeBotoes/2, posicaoYBotaoFechar) < tamanhoDosBotoes/2) {
    if (portasEstaoAbertas) portasEstaoAbertas = false;
    return;
  }

  // ✅ BOTÃO DESCER → VAI DIRETO PRO 1º ANDAR
  if (dist(mouseX, mouseY, posicaoXDoPainel + larguraDoPainelDeBotoes/2, posicaoYBotaoDescer) < tamanhoDosBotoes/2) {
    if (andarAtualDoElevador !== 1 && !elevadorEstaSeMovendo) {
      portasEstaoAbertas = false;
      andarDestinoDoElevador = 1; // Sempre vai pro 1
      elevadorEstaSeMovendo = true;
      tempoParaChegarAoDestino = 120;
    }
    return;
  }

  // Clique para entrar no ambiente
  if (portasEstaoAbertas && aberturaDasPortas >= metadeDaLarguraDasPortas - width * 0.02 && andarAtualDoElevador !== 2) {
    if (mouseX > posicaoXInicioPortas && mouseX < posicaoXFimPortas && mouseY > alturaDoTeto && mouseY < alturaDoChao) {
      somDoElevador.stop();
      if (andarAtualDoElevador === 1) window.location.href = "paginas/corredorassombrado.html";
      if (andarAtualDoElevador === 3) window.location.href = "paginas/cidade.html";
    }
  }
}

// ------------------------------
// AJUSTE DE TAMANHO DE TELA
// ------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}