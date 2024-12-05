const mf_Points = [{x: 0, y: 0}]; // Mouse points
const mf_MaxPoints = 20; // Maximum number of mf_Points to keep in the trail
const mf_MaxFishes = 3;

const mf_FishImages = [
    "assets/fish-0.png",
    "assets/fish-1.png",
    "assets/fish-2.png",
];

const mf_FishElements = [];
for (let i = 0; i < mf_MaxFishes; i++) {
    const fish = document.createElement("img");
    const fishFrame = document.createElement("div");
    fishFrame.appendChild(fish);

    fish.src = mf_FishImages[i % mf_FishImages.length]; // Cycle through images
    fish.classList.add('fish', 'swimming'); // Add swimming class for animation
    document.getElementById('fish-container').appendChild(fishFrame);
    mf_FishElements.push(fishFrame);
}

function mf_CalculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees
}

function mf_Update() {
    // Limit the number of mf_Points
    if (mf_Points.length > 1) { // The last corresponds to the mouse's pos.
        mf_Points.shift(); // Remove the oldest point
    }

    // Build the mf_Path data string
    /*const d = mf_Points.map((point, index) => {
        return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
    }).join(' ');
    mf_Path.setAttribute('d', d); // Update the mf_Path's 'd' attribute*/

    let curr = 1;
    if (mf_Points.length > 1) {
        curr = 1;
    }

    // Get the corresponding point.
    const p = mf_Points[curr];
    const fish = mf_FishElements[0];
    fish.style.transform = `translate(${p.x}px, ${p.y}px)`;

    // Add rotation if available.
    if (curr > 0) {
        const prev = mf_Points[curr-1];
        const angle = mf_CalculateAngle(prev.x, prev.y, p.x, p.y);
        fish.style.transform += ` rotate(${angle}deg)`;
    }

    for (let i = 1; i < mf_MaxFishes; i++) {
        let curr = Math.floor((mf_Points.length / mf_MaxFishes) * i);

        // Get the corresponding point.
        const p = mf_Points[curr];
        const fish = mf_FishElements[i];
        fish.style.transform = `translate(${p.x}px, ${p.y}px)`;

        // Add rotation if available.
        if (curr > 0) {
            const prev = mf_Points[curr-1];
            const angle = mf_CalculateAngle(prev.x, prev.y, p.x, p.y);
            fish.style.transform += ` rotate(${angle}deg)`;
        }
    }
}

document.addEventListener('mousemove', (event) => {
    // Add new point
    mf_Points.push({ x: event.clientX, y: event.clientY });

    // Limit the number of mf_Points
    while (mf_Points.length > mf_MaxPoints) {
        mf_Points.shift(); // Remove the oldest point
    }
});

setInterval(mf_Update, 100);
