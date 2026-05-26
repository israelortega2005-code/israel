const storedUser = 'Lucas';
const storedPassword = 'evaluacion02';
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginAlert = document.getElementById('loginAlert');
const loginAlertMessage = document.getElementById('loginAlertMessage');
const loginLogo = document.getElementById('loginLogo');
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const dashboardUser = document.getElementById('dashboardUser');
const actionButton = document.getElementById('actionButton');
const cardContainer = document.getElementById('cardContainer');
const cardHeader = document.getElementById('cardHeader');
const cardImage = document.getElementById('cardImage');
const cardTitle = document.getElementById('cardTitle');
const cardDescription = document.getElementById('cardDescription');
const cardFooter = document.getElementById('cardFooter');
const dashboardFooter = document.getElementById('dashboardFooter');
const logoutButton = document.getElementById('logoutButton');

const state = {
  counter: 15,
};

const images = {
  primary: 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#0d6efd"/><path d="M39 62l14 14 28-40" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`),
  warning: 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#ffc107"/><path d="M60 38v28" stroke="#212529" stroke-width="12" stroke-linecap="round"/><circle cx="60" cy="84" r="6" fill="#212529"/></svg>`),
  danger: 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#dc3545"/><path d="M40 40l40 40M80 40l-40 40" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>`),
  error: 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#dc3545"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="64" fill="#fff">!</text></svg>`),
  normal: 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#0d6efd"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="#fff">OK</text></svg>`),
};

const cardState = (counter) => {
  
  if (counter >= 11) {
    return {
      level: 'primary',
      header: 'Fase 1: Inicio',
      title: 'Sistema listo para comenzar',
      description: 'El contador está alto, el sistema se mantiene en estado de confianza. Presiona para seguir avanzando.',
      image: images.primary,
      footer: `Contador: ${counter}`,
      buttonText: `Presióname (${counter})`,
      footerText: 'Estado: Estable',
    };
  }

  if (counter >= 6) {
    return {
      level: 'warning',
      header: 'Fase 2: Precaución',
      title: 'Advertencia leve',
      description: 'El contador está descendiendo y el sistema cambia a un estado de atención. Revisa el progreso y continúa.',
      image: images.warning,
      footer: `Contador: ${counter}`,
      buttonText: `Presióname (${counter})`,
      footerText: 'Estado: Precaución',
    };
  }

  return {
    level: 'danger',
    header: 'Fase 3: Alerta',
    title: 'Cuidado intensivo',
    description: 'El contador está bajo. Ahora el sistema muestra un estado crítico, y al llegar a cero regresa al inicio.',
    image: images.danger,
    footer: `Contador: ${counter}`,
    buttonText: `Presióname (${counter})`,
    footerText: 'Estado: Crítico',
  };
};

function showAlert(message, type = 'danger') {
  const prefix = type === 'warning' ? 'Atención:' : type === 'danger' ? 'Error:' : 'Aviso:';
  loginAlert.className = `alert alert-${type} alert-dismissible fade show d-flex align-items-center`;
  loginAlertMessage.innerHTML = `<strong>${prefix}</strong> ${message}`;
  loginAlert.style.display = 'flex';
}

function hideAlert() {
  loginAlert.style.display = 'none';
  loginAlert.classList.add('d-none');
}

function updateLoginLogo(error = false) {
  loginLogo.src = error ? images.error : images.normal;
  loginLogo.alt = error ? 'Error' : 'Logo de acceso';
}

function updateDashboard() {
  const card = cardState(state.counter);

  actionButton.textContent = card.buttonText;
  actionButton.className = `btn btn-${card.level} btn-lg w-100`; 

  cardContainer.className = `card card-custom border-${card.level}`;
  cardHeader.textContent = card.header;
  cardHeader.className = `card-header bg-${card.level} text-white`;
  cardTitle.textContent = card.title;
  cardDescription.textContent = card.description;
  cardImage.src = card.image;
  cardImage.alt = card.title;
  cardFooter.textContent = card.footer;
  dashboardFooter.textContent = card.footerText;
}

function goToDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  dashboardUser.textContent = storedUser;
  state.counter = 15;
  updateDashboard();
}

function resetLogin() {
  loginSection.style.display = 'block';
  dashboardSection.style.display = 'none';
  usernameInput.value = '';
  passwordInput.value = '';
  hideAlert();
  updateLoginLogo(false);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showAlert('El campo o los campos están vacíos.', 'warning');
    updateLoginLogo(true);
    return;
  }

  if (username === storedUser && password === storedPassword) {
    hideAlert();
    updateLoginLogo(false);
    goToDashboard();
    return;
  }

  showAlert('Error en la autenticación. Usuario o contraseña incorrectos.', 'danger');
  updateLoginLogo(true);
});

actionButton.addEventListener('click', () => {
  state.counter -= 1;
  if (state.counter <= 0) {
    state.counter = 15;
  }
  updateDashboard();
});

logoutButton.addEventListener('click', () => {
  resetLogin();
});

window.addEventListener('DOMContentLoaded', () => {
  resetLogin();
});



