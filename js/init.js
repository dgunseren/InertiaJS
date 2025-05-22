const canvas = document.getElementById('cadCanvas');
const ctx = canvas.getContext('2d');
const logDiv = document.getElementById('logOutput');

const scale = 1.0;
let lines = [], shapes = [], shapeTypes = [];
let startPoint = null, currentEnd = null, isDrawing = false;
let maxes, TotalInertia = 0;
let Returned = {x: 0, y: 0, width: 0, height: 0};
let pingrid = 0;
let maxMoment = 0;
let maxShear = 0;
let maxAxial = 0;
let totalArea = 0;

window.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'Forces') {
    const { Mx, Vx, Nx } = event.data;
    console.log('Received Forces ->', 'Mx:', Mx, 'Vx:', Vx, 'Nx:', Nx);
    maxMoment = Mx;
    maxShear = Vx;
    maxAxial = Nx;
    totalArea = pingrid;

    // Handle Mx, Vx, Nx as needed
  }
});


const originalLog = console.log;
console.log = function(...args) {
  originalLog.apply(console, args);
  const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
  const p = document.createElement('div');
  p.textContent = msg;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
};
