// ====================================================================
// 1. SELECTORES
// ====================================================================

// Menú Hamburguesa
const menuham = document.getElementById('menuham');
const toggle = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay');

// Carrusel (Portada) - SOLO existe en Index.html
const portada = document.querySelector('.portada img');
const leftBtn = document.querySelector('.portada .arrow.left');
const rightBtn = document.querySelector('.portada .arrow.right');
const dots = document.querySelectorAll('.portada-dots div');
const portadaImgs = [
  "img/hollow.jpg",
  "img/Peg.jpg",
  "img/GranTurismo.jpg"
];
let portadaIndex = 0;

// Menú de Usuario
const userBtn = document.getElementById("user");
const userMenu = document.getElementById("user-menu");


// ====================================================================
// 2. LÓGICA DEL CARRUSEL (solo si existe portada)
// ====================================================================
if (portada && leftBtn && rightBtn && dots.length > 0) {
  function setActiveDot(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function mostrarPortada(index) {
    portada.src = portadaImgs[index];
    setActiveDot(index);
  }

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

  // Inicializar portada
  mostrarPortada(0);
}


// ====================================================================
// 3. LÓGICA DEL MENÚ HAMBURGUESA
// ====================================================================
if (toggle && menuham && overlay) {
  const cerrarMenuham = () => {
    menuham.classList.remove('open');
    overlay.classList.remove('show');
  };

  // Abre/Cierra con el botón
  toggle.addEventListener('click', () => {
    const isOpen = menuham.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
  });

  // Cierra al hacer clic en el overlay
  overlay.addEventListener('click', cerrarMenuham);

  // Cierra al redimensionar la ventana (para escritorio)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      cerrarMenuham();
    }
  });
}


// ====================================================================
// 4. LÓGICA DEL MENÚ DE USUARIO
// ====================================================================
if (userBtn && userMenu) {
  userBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.remove("open");
    }
  });
}
