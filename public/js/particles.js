// Particle effect for background (sky blue, subtle)
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticles(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.7, // Subtle radius
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(244, 114, 182, 0.35)'; // Sky blue (tailwind sky-400)
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  particles = createParticles(80);
});

resizeCanvas();
particles = createParticles(80);
drawParticles();
