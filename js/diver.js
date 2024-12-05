const dv_Points = [{x: 0, y: 0}]; // Mouse points
const dv_MaxPoints = 20; // Maximum number of dv_Points to keep in the trail
let dv_Diver = undefined;

function dv_Create() {
    const diver = document.createElement("img");
    const diverFrame = document.createElement("div");
    diverFrame.appendChild(diver);

    diver.src = "assets/diver.png"; // Cycle through images
    diver.classList.add('diver', 'swimming'); // Add swimming class for animation
    document.getElementById('diver-container').appendChild(diverFrame);
    dv_Diver = diverFrame;
}

function dv_CalculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
}

function dv_Update() {
    // Limit the number of mf_Points
    if (dv_Points.length > 1) { // The last corresponds to the mouse's pos.
        dv_Points.shift(); // Remove the oldest point
    }

    let curr = dv_Points.length -1;
    if (curr < 0) {
        curr = 0;
    }

    // Get the corresponding point.
    const p = dv_Points[curr];
    const diver = dv_Diver;
    diver.style.transform = `translate(${p.x}px, ${p.y}px)`;

    // Add rotation if available.
    if (curr > 0) {
        const prev = dv_Points[curr-1];
        const angle = dv_CalculateAngle(prev.x, prev.y, p.x, p.y);
        diver.style.transform += ` rotate(${angle}deg)`;
    }
}

document.addEventListener('mousemove', (event) => {
    // Add new point
    dv_Points.push({ x: event.clientX, y: event.clientY });

    // Limit the number of mf_Points
    while (dv_Points.length > dv_MaxPoints) {
        dv_Points.shift(); // Remove the oldest point
    }
});

dv_Create();
setInterval(dv_Update, 100);
