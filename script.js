const menuham = document.getElementById('menuham');
const toggle = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay');
const portada = document.querySelector('.portada img');
const leftBtn = document.querySelector('.portada .arrow.left');
const rightBtn = document.querySelector('.portada .arrow.right');
const dots = document.querySelectorAll('.portada-dots div');
const userBtn = document.getElementById("user");
const userMenu = document.getElementById("user-menu");

const portadaImgs = [
  "img/hollow.jpg",
  "img/Peg.jpg",
  "img/GranTurismo.jpg"
];

let portadaIndex = 0;

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function mostrarPortada(index) {
  portada.src = portadaImgs[index];
  setActiveDot(index);
}

// flechas
leftBtn.addEventListener('click', () => {
  portadaIndex = (portadaIndex - 1 + portadaImgs.length) % portadaImgs.length;
  mostrarPortada(portadaIndex);
});

rightBtn.addEventListener('click', () => {
  portadaIndex = (portadaIndex + 1) % portadaImgs.length;
  mostrarPortada(portadaIndex);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    portadaIndex = i;
    mostrarPortada(i);
  });
});

mostrarPortada(0);

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

setActiveDot(0);

const cerrarMenuham = () => {
 menuham.classList.remove('open');
 overlay.classList.remove('show');
};

toggle.addEventListener('click', () => {
 const isOpen = menuham.classList.toggle('open');
 overlay.classList.toggle('show', isOpen);
});

overlay.addEventListener('click', cerrarMenuham);

window.addEventListener('resize', () => {
 if (window.innerWidth > 1024) {
  menuham.classList.remove('open');
  overlay.classList.remove('show');
 }
});
const userButton = document.getElementById('user');
const userDropdown = document.getElementById('user-dropdown');

function toggleDropdown() {
    userDropdown.classList.toggle('show');
}
userButton.addEventListener('click', (event) => {
    event.stopPropagation(); 
    toggleDropdown();
});

document.addEventListener('click', (event) => {
    if (!userDropdown.contains(event.target) && event.target !== userButton) {
        if (userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    }
});

userBtn.addEventListener("click", () => {
  userMenu.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
    userMenu.classList.remove("open");
  }
});
