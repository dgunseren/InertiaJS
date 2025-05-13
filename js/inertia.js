function calculateRotationCenter(shapes) {
  let areas = [], centers = [], totalArea = 0;
  let allPoints = [], maxFound = false;
  let totX = 0, totY = 0;

  shapes.forEach(shape => {
    let points = [], sumX = 0, sumY = 0, quantity = 0;

    shape.forEach(line => {
      points.push(line.start.x, line.start.y);
      allPoints.push(line.start.x, line.start.y);
      sumX += line.start.x;
      sumY += line.start.y;
      quantity++;
    });

    let area = Math.abs(PolyK.GetArea(points));
    areas.push(area);

    if (!maxFound) {
      maxes = PolyK.GetAABB(points);
      console.log('maxes', maxes);
      maxFound = true;
    }

    let bbox = PolyK.GetAABB(allPoints);
    let center = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    centers.push(center);
  });

  totalArea = areas.reduce((a, b) => a + b, 0);
  centers.forEach((c, i) => {
    totX += (c.x * areas[i]) / totalArea;
    totY += (c.y * areas[i]) / totalArea;
  });

  return { x: totX, y: totY };
}

function finishAll(shapes, shapeTypes) {
  const RotationCenter = calculateRotationCenter(shapes);
  let totalInertia = 0;

  shapeTypes[0] = 'outside';
  shapes.forEach((shape, i) => {
    let inertiaSum = 0;
    let gridPoints = generateGridInsideShape(shape, 1);

    gridPoints.forEach(p => {
      let d2 = (p.x - RotationCenter.x) ** 2 + (p.y - RotationCenter.y) ** 2;
      inertiaSum += d2;
    });

    totalInertia += shapeTypes[i] === 'inside' ? -1 * inertiaSum : inertiaSum;
    console.log('Partial Inertia:', inertiaSum);
  });

  TotalInertia = totalInertia * 1e-12;
  console.log('Total Inertia:', TotalInertia);
  document.getElementById('momentPopup').style.display = 'block';
}

function closeMomentPopup() {
  document.getElementById('momentPopup').style.display = 'none';
}

function calculateMoment() {
  const maxMoment = parseFloat(document.getElementById('maxMoment').value);
  const result = (maxMoment * 9.81 * 1000 * maxes.width * 1e-3) / TotalInertia;

  const resultMessage = `Total Inertia: ${TotalInertia.toFixed(4)} m4\n` +
                        `Maximum Moment: ${maxMoment} tonMeter\n` +
                        `Result: ${result.toFixed(4)} Pa\n` +
                        `Result: ${(result * 1e-6).toFixed(4)} MPa`;

  console.log(resultMessage);
  alert(resultMessage);
  closeMomentPopup();
}
