const canvas = document.getElementById("petalas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const PETAL_IMAGE = (() => {
  const svg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="22" rx="7" ry="15" fill="#a259f7" fill-opacity="0.88"/><ellipse cx="16" cy="17" rx="4.5" ry="9" fill="#fff" fill-opacity="0.15"/></svg>`;
  const img = new window.Image();
  img.src = "data:image/svg+xml;base64," + btoa(svg);
  return img;
})();

// ---- pétalas ----
function Petala() {
  this.x = Math.random() * width;
  this.y = Math.random() * -100;
  this.size = 22 + Math.random() * 18;
  this.speed = 0.6 + Math.random() * 0.6;
  this.wind = -0.7 + Math.random() * 1.4;
  this.ang = Math.random() * 2 * Math.PI;
  this.angSpeed = 0.01 + Math.random() * 0.012;
}
Petala.prototype.update = function () {
  this.x += this.wind + Math.sin(this.ang) * 0.7;
  this.y += this.speed;
  this.ang += this.angSpeed;
  if (this.y > height + 60) {
    this.x = Math.random() * width;
    this.y = -40;
  }
};
Petala.prototype.draw = function () {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.ang);
  ctx.drawImage(PETAL_IMAGE, -this.size / 2, -this.size / 2, this.size, this.size);
  ctx.restore();
};

// ---- confetes ----
function Confete() {
  this.x = Math.random() * width;
  this.y = Math.random() * -100;
  this.size = 5 + Math.random() * 8;
  this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  this.speed = 1 + Math.random() * 2;
  this.wind = -1 + Math.random() * 2;
  this.opacity = 1;
  this.fade = 0.002 + Math.random() * 0.003;
}
Confete.prototype.update = function () {
  this.x += this.wind;
  this.y += this.speed;
  this.opacity -= this.fade;
};
Confete.prototype.draw = function () {
  if (this.opacity <= 0) return;
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

let petalas = [];
let confetes = [];
for (let i = 0; i < 36; i++) petalas.push(new Petala());

let mostrarConfetes = false;
function criarConfetes() {
  for (let i = 0; i < 80; i++) confetes.push(new Confete());
  setTimeout(() => (mostrarConfetes = false), 8000);
}

function loop() {
  ctx.clearRect(0, 0, width, height);
  petalas.forEach(p => { p.update(); p.draw(); });
  if (mostrarConfetes) {
    confetes.forEach(c => { c.update(); c.draw(); });
  }
  requestAnimationFrame(loop);
}
PETAL_IMAGE.onload = loop;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// ---- gatilho no fim ----
window.addEventListener("animationend", () => {
  mostrarConfetes = true;
  criarConfetes();
});
window.addEventListener("finalTexto", () => {
  mostrarConfetes = true;
  criarConfetes();
});
