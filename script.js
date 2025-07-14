const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let spacing = 70;
let dots = [];

const bgImage = new Image();
bgImage.src = "bg.png"; // ✅ Make sure this matches the actual file name

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initDots();
}

function initDots() {
  dots = [];
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({ x, y, r: 2 });
    }
  }
}

let mouse = { x: -9999, y: -9999 }; // Keep far when not used
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawBackground() {
  ctx.drawImage(bgImage, 0, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Darken
  ctx.fillRect(0, 0, width, height);

}

function drawDots() {
  for (let dot of dots) {
    let dx = dot.x - mouse.x;
    let dy = dot.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let maxDist = 150;
    let radius = dot.r;

    if (dist < maxDist) {
      radius = 1 + (maxDist - dist) / 20;
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // softer white
    ctx.fill();
  }
}

function animate() {
  drawBackground();
  drawDots();
  requestAnimationFrame(animate);
}

bgImage.onload = () => {
  resizeCanvas();
  animate();
};

window.addEventListener("resize", resizeCanvas);
