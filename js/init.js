const canvas = document.getElementById('cadCanvas');
const ctx = canvas.getContext('2d');
const logDiv = document.getElementById('logOutput');

const scale = 1.0;
let lines = [], shapes = [], shapeTypes = [];
let startPoint = null, currentEnd = null, isDrawing = false;
let maxes, TotalInertia = 0;
let Returned = {x: 0, y: 0, width: 0, height: 0};
let maxMomentFromEduBeam = 0;

window.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'BendingMoment') return;

  let { Mx } = event.data;
  // Convert from N⋅m to ton⋅m (divide by 9810)
  Mx = Mx / 9810;
  console.log('Received Mx:', Mx);
  maxMomentFromEduBeam = Mx;  // Store the converted value
  
  // Update the real-time display
  document.getElementById('momentDisplay').textContent = `Current Bending Moment: ${Mx.toFixed(2)} tonMeter`;

  // Set Mx into your moment input and call calculator
  //document.getElementById('maxMoment').value = Mx;
  //calculateMoment(); // calls your existing inertia logic
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
