function calculateRotationCenter(shapes) {
  let areas = [], centers = [], totalArea = 0;
  let allPoints = [], maxFound = false;
  let totX = 0, totY = 0;

  shapes.forEach(shape => {
    let points = []

    shape.forEach(line => {
      allPoints.push(line.start.x, line.start.y);
    });

   

  });
  maxes = PolyK.GetAABB(allPoints);

  return maxes;
}

function finishAll(shapes, shapeTypes) {
  Returned = calculateRotationCenter(shapes);
  let RotationCenter = {x: Returned.x+Returned.width/2, y: Returned.y+Returned.height/2}
  let totalInertia = 0;
  let totalArea = 0;
  console.log('RotationCenter', Returned);
  shapeTypes[0] = 'outside';
 

   shapes.forEach((shape, i) => {
  let inertiaSum = 0;
    
  let gridPoints = generateGridInsideShape(shape, 0.1);
  let PartialArea =0
  

  


  gridPoints.forEach(p => {
      //let d2 = (p.x - RotationCenter.x) ** 2 + (p.y - RotationCenter.y) ** 2;
      let d2 = 0.01*(p.y - RotationCenter.y) ** 2;
      inertiaSum += d2;
      PartialArea += 0.01;
    });

    totalInertia += shapeTypes[i] === 'inside' ? -1 * inertiaSum : inertiaSum;
    totalArea += shapeTypes[i] === 'inside' ? -1 * PartialArea : PartialArea;

    console.log('Partial Inertia:', inertiaSum);
  });

  TotalInertia = totalInertia * 1e-12;
  console.log('Total Inertia:', TotalInertia);
  console.log('Total Area is ', totalArea);
  document.getElementById('momentPopup').style.display = 'block';
}

function closeMomentPopup() {
  document.getElementById('momentPopup').style.display = 'none';
}

function calculateMoment() {
  //const maxMoment = parseFloat(document.getElementById('maxMoment').value);
  //let maxMoment = maxMomentFromEduBeam
  console.log('Height', Returned.height);
  const BendingStress = maxMoment/ TotalInertia*(1e12);
  const ShearStress = maxShear/totalArea;
  const resultMessage = `Total Inertia: ${TotalInertia.toFixed(4)} m4\n` +
                        `Total Area: ${totalArea.toFixed(4)} m2\n` +
                        `Maximum Moment: ${maxMoment} tonMeter\n` +
                        `Bending Stress: ${BendingStress.toFixed(4)} MPa\n` +
                        `Shear Stress: ${ShearStress.toFixed(4)} MPa`;

  console.log(resultMessage);
  alert(resultMessage);
  closeMomentPopup();
}
