import * as THREE from 'three';

// === Scroll Swap Logic ===
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
let current = 1;

window.addEventListener('wheel', () => {
  if (current === 1) {
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
    current = 2;
  }
});

document.getElementById('role0').onclick = () =>
  window.location.href = 'https://your-frontend-portfolio.com';
document.getElementById('role1').onclick = () =>
  window.location.href = 'https://your-swe-portfolio.com';
document.getElementById('role2').onclick = () =>
  window.location.href = 'https://your-ds-portfolio.com';

// === Particle Sphere ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particleCount = 6000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const phi = Math.acos(2 * Math.random() - 1);
  const theta = Math.random() * 2 * Math.PI;
  const r = 100;

  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi);
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  points.rotation.x += 0.0003;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
