const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ===== IMAGENS =====
const shipImg = new Image();
shipImg.src = "img/nave.png";

const alienImg = new Image();
alienImg.src = "img/alien.png";

// ===== VARIÁVEIS =====
let shipX = canvas.width / 2;
let bullets = [];
let alienBullets = [];
let aliens = [];
let score = 0;
let gameOver = false;
let speedLevel = 1;

// ===== RECORD E CAMPEÃO =====
let record = localStorage.getItem("record") || 0;
let champion = localStorage.getItem("champion") || "---";

document.getElementById("record").innerText = `Recorde: ${record}`;
document.getElementById("champion").innerText = champion;

// ===== CONTROLE MOUSE =====
canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  shipX = e.clientX - rect.left;
});

canvas.addEventListener("click", () => {
  bullets.push({ x: shipX, y: canvas.height - 45 });
});

// ===== CRIA ALIENS =====
function createAliens() {
  aliens = [];
  for (let i = 0; i < 8; i++) {
    aliens.push(newAlien(50 + i * 55, 40));
  }
}

function newAlien(x, y) {
  return {
    x,
    y,
    dir: Math.random() > 0.5 ? 1 : -1,
    speed: Math.random() * speedLevel + 0.5
  };
}

// ===== DESENHOS =====
function drawShip() {
  ctx.drawImage(shipImg, shipX - 16, canvas.height - 40, 32, 32);
}

function drawBullets() {
  ctx.fillStyle = "#00ff00";
  bullets.forEach((b, i) => {
    b.y -= 6;
    ctx.fillRect(b.x, b.y, 3, 8);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

function drawAlienBullets() {
  ctx.fillStyle = "red";
  alienBullets.forEach((b, i) => {
    b.y += 3 + speedLevel;
    ctx.fillRect(b.x, b.y, 3, 8);
    if (b.y > canvas.height) alienBullets.splice(i, 1);
  });
}

function drawAliens() {
  aliens.forEach(a => {
    ctx.drawImage(alienImg, a.x, a.y, 28, 18);
    a.x += a.dir * a.speed;

    if (Math.random() < 0.01) a.dir *= -1;

    if (a.x < 10 || a.x > canvas.width - 40) {
      a.dir *= -1;
    }

    if (Math.random() < 0.002 * speedLevel) {
      alienBullets.push({ x: a.x + 14, y: a.y + 18 });
    }
  });
}

// ===== COLISÕES =====
function collision() {

  bullets.forEach((b, bi) => {
    aliens.forEach((a, ai) => {
      if (
        b.x > a.x &&
        b.x < a.x + 28 &&
        b.y > a.y &&
        b.y < a.y + 18
      ) {
        bullets.splice(bi, 1);
        aliens.splice(ai, 1);
        aliens.push(newAlien(Math.random() * 450, 40));

        score += 10;
        document.getElementById("score").innerText = score;

        if (score % 500 === 0) {
          speedLevel++;
        }
      }
    });
  });

  alienBullets.forEach((b, i) => {
    if (
      b.y > canvas.height - 40 &&
      b.x > shipX - 16 &&
      b.x < shipX + 16
    ) {
      alienBullets.splice(i, 1);
      endGame();
    }
  });
}

// ===== GAME OVER =====
function endGame() {
  gameOver = true;
  document.getElementById("finalScore").innerText = score;
  document.getElementById("gameOver").classList.remove("hidden");
}

// ===== SALVAR SCORE =====
function saveScore() {
  const name = document.getElementById("playerName").value.toUpperCase() || "???";

  if (score > record) {
    localStorage.setItem("record", score);
    localStorage.setItem("champion", name);
    alert(`🏆 NOVO RECORDE! ${name}: ${score}`);
  }

  location.reload();
}

// ===== LOOP =====
function loop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawBullets();
  drawAlienBullets();
  drawAliens();
  collision();

  requestAnimationFrame(loop);
}

// ===== START =====
let loaded = 0;
[shipImg, alienImg].forEach(img => {
  img.onload = () => {
    loaded++;
    if (loaded === 2) {
      createAliens();
      loop();
    }
  };
});
