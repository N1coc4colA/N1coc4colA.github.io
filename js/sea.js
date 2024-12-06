const movableSquare = document.getElementById("movableSquare");
const bodySquare = document.getElementById("bodySquare");
const bodyimg = document.getElementById("bodyimg");
const organs = document.getElementsByClassName("organ");

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
    const fixedRect = bodySquare.getBoundingClientRect();

    for (let i = 0; i < organs.length; i++) {
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

alert("Saisissez le carré, et déplacez-le pour voir les organes de la Terre!");
