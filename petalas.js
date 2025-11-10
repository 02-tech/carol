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

let petalas = [];
for (let i = 0; i < 40; i++) petalas.push(new Petala());

function loop() {
  ctx.clearRect(0, 0, width, height);
  petalas.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(loop);
}
PETAL_IMAGE.onload = loop;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// --- Fade-in de volume ---
export function fadeInAudio(audio, duracao = 2000) {
  audio.volume = 0;
  const passo = 0.02 / (duracao / 40);
  const fade = setInterval(() => {
    if (audio.volume < 1) audio.volume = Math.min(1, audio.volume + passo);
    else clearInterval(fade);
  }, 40);
}
