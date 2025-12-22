const canvas = document.getElementById("bg-graph");
const ctx = canvas.getContext("2d");

let w, h;
const nodes = [];
const NODE_COUNT = 45;
const MAX_DIST = 140;
const mouse = { x: null, y: null };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Node {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    // Cursor interaction
    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        this.vx += dx * 0.0005;
        this.vy += dy * 0.0005;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#22d3ee";
    ctx.fill();
  }
}

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push(new Node());
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  nodes.forEach((n) => {
    n.move();
    n.draw();
  });

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST) {
        ctx.strokeStyle = `rgba(34, 211, 238, ${1 - dist / MAX_DIST})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
