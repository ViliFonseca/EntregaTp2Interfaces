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
const cerrarSesionBtn = document.querySelector("#user-menu li:last-child");
const userSpan = userBtn.querySelector("span");
const userImg = userBtn.querySelector("img");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.querySelector(".modal-title");
const modalForm = modalOverlay.querySelector("form");
const closeBtn = document.querySelector(".close-btn");

let sesionActiva = true;
let modoRegistro = false;


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
   
    if (sesionActiva) {
      
      userMenu.classList.toggle("open");
    } else {
      mostrarLogin();
      modalOverlay.classList.add("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.remove("open");
    }
  });
}
// ====================================================================
// ABRIR / CERRAR SESIÓN
// ====================================================================
cerrarSesionBtn.addEventListener("click", () => {
  sesionActiva = false;
  userSpan.style.display = "none";
  userImg.src = "img/images.png"; 
  userMenu.classList.remove("open");
});

// ====================================================================
// ABRIR / CERRAR MODAL
// ====================================================================
userBtn.addEventListener("click", () => {
  if (!sesionActiva) {
    modalOverlay.classList.add("active");
    mostrarRegistro();
  }
});

closeBtn.addEventListener("click", () => modalOverlay.classList.remove("active"));
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("active");
});

// ====================================================================
// FORMULARIO: REGISTRO / LOGIN
// ====================================================================
function mostrarRegistro() {
  modoRegistro = true;
  modalTitle.textContent = "Registrarse";
  modalForm.innerHTML = `
    <div class="form-group"><label class=form-label>Nombre</label><input type="text" class="form-input" required></div>
    <div class="form-group"><label class=form-label >Apellido</label><input type="text" class="form-input" required></div>
    <div class="form-group"><label class=form-label>Nickname</label><input type="text" class="form-input" required></div>
    <div class="form-group"><label class=form-label>E-Mail</label><input type="email" class="form-input" required></div>
    <div class="form-group"><label class=form-label >Fecha de nacimiento</label><input type="date" class="form-input" required></div>
    <div class="form-group"><label class=form-label>Contraseña</label><input type="password" class="form-input" required></div>
    <div class="form-group"><label class=form-label>Repetir Contraseña</label><input type="password" class="form-input" required></div>
    </div>
    <button type="submit" class="submit-btn">Registrarse</button>
    <div class="footer-link">¿Ya tienes cuenta? <a href="#" id="toLogin">Inicia sesión</a>
  `;
}

function mostrarLogin() {
  modoRegistro = false;
  modalTitle.textContent = "Iniciar Sesión";
  modalForm.innerHTML = `
    <div class="form-group"><label class=form-label>E-Mail</label><input type="email" class="form-input" required></div>
    <div class="form-group"><label class=form-label>Contraseña</label><input type="password" class="form-input" required></div>
    <button type="submit" class="submit-btn">Ingresar</button>
    <div class="footer-link">¿No tienes cuenta? <a href="#" id="toRegister">Regístrate</a></div>
  `;
}


// ====================================================================
// CAMBIO ENTRE LOGIN / REGISTRO
// ====================================================================
modalOverlay.addEventListener("click", e => {
  if (e.target.id === "toLogin") {
    e.preventDefault();
    mostrarLogin();
  }
  if (e.target.id === "toRegister") {
    e.preventDefault();
    mostrarRegistro();
  }
});

