const movableSquare = document.getElementById("movableSquare");
const bodySquare = document.getElementById("bodySquare");
const bodyimg = document.getElementById("bodyimg");
const organs = document.getElementsByClassName("organ");
let bBoxes = [];

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Set CORS attribute if needed
      img.src = url;

      img.onload = () => {
          resolve(img); // Resolve the promise with the loaded image
      };

      img.onerror = (error) => {
          console.log(error);
          reject(error); // Reject the promise if there is an error
      };
  });
};

function getBoundingRectOfNonTransparentPixels(imgElement) {
  // Create a canvas and get its context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions to match the image
  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;

  const img = loadImage(imgElement.src);
  //const img = new Image();
  //img.crossOrigin = 'anonymous'; // Set CORS attribute
  //img.src = imgElement.src;

  // Draw the image on the canvas
  ctx.drawImage(imgElement, 0, 0);

  // Get pixel data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let minX = canvas.width, minY = canvas.height;
  let maxX = 0, maxY = 0;

  // Iterate through each pixel to find non-transparent pixels
  for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3]; // Get alpha value

          // Check if pixel is not transparent
          if (alpha > 0) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
          }
      }
  }

  // Check if any non-transparent pixels were found
  if (maxX >= minX && maxY >= minY) {
      return {
          topLeft: { x: minX, y: minY },
          bottomRight: { x: maxX, y: maxY },
          width: maxX - minX,
          height: maxY - minY
      };
  } else {
      return null; // No non-transparent pixels found
  }
}

for (let i = 0; i < organs.length; i++) {
  bBoxes.push(undefined);
}

function checkImageLoaded(imgElement, i) {
  if (imgElement.complete) {
      // Image is already loaded
      bBoxes[i] = getBoundingRectOfNonTransparentPixels(imgElement);
  } else {
      const j = i;
      imgElement.onload = (j) => bBoxes[j] = getBoundingRectOfNonTransparentPixels(imgElement);
  }
}

for (let i = 0; i < organs.length; i++) {
  checkImageLoaded(organs[i], i);
}

let isDragging = false;

movableSquare.addEventListener("mousedown", (e) => {
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // Calculer la position du carré mobile
    let x = e.clientX - movableSquare.offsetWidth / 2;
    let y = e.clientY - movableSquare.offsetHeight / 2;

    // Limiter le mouvement du carré mobile à l'intérieur du conteneur
    const containerRect = bodySquare.parentElement.getBoundingClientRect();
    const squareRect = bodySquare.getBoundingClientRect();

    if (x < containerRect.left) x = containerRect.left;
    if (y < containerRect.top) y = containerRect.top;
    if (x + movableSquare.offsetWidth > containerRect.right) x = containerRect.right - movableSquare.offsetWidth;
    if (y + movableSquare.offsetHeight > containerRect.bottom) y = containerRect.bottom - movableSquare.offsetHeight;

    movableSquare.style.left = `${x - containerRect.left}px`;
    movableSquare.style.top = `${y - containerRect.top}px`;

    // Vérifier la superposition entre les carrés
    const movableRect = movableSquare.getBoundingClientRect();
    //const fixedRect = bodySquare.getBoundingClientRect();

    for (let i = 0; i < organs.length; i++) {
      const fixedRect = bBoxes[i];
      if (fixedRect == undefined) {
        continue;
      }

      // Si les carrés se superposent, afficher image2 dans la zone de superposition
      if (
        movableRect.left < fixedRect.right &&
        movableRect.right > fixedRect.left &&
        movableRect.top < fixedRect.bottom &&
        movableRect.bottom > fixedRect.top
      ) {
        const overlayWidth = Math.min(movableRect.right, fixedRect.right) - Math.max(movableRect.left, fixedRect.left);
        const overlayHeight = Math.min(movableRect.bottom, fixedRect.bottom) - Math.max(movableRect.top, fixedRect.top);
  
        organs[i].style.display = "block";
        organs[i].style.clipPath = `inset(${Math.max(movableRect.top, fixedRect.top) - fixedRect.top}px 
                                   ${fixedRect.right - Math.min(movableRect.right, fixedRect.right)}px 
                                   ${fixedRect.bottom - Math.min(movableRect.bottom, fixedRect.bottom)}px 
                                   ${Math.max(movableRect.left, fixedRect.left) - fixedRect.left}px)`;
      } else {
        organs[i].style.display = "none";
      }
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
