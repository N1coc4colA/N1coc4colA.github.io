// Script pour afficher et fermer la sidebar
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Ouvre ou ferme la sidebar quand le hamburger est cliqué
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');  // Ajoute ou retire la classe 'open' pour afficher ou cacher la sidebar
});