// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

  // Function to open a modal
  function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  // Function to close a modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  // LOGIN MODAL
  document.querySelector('.header__login').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('loginModal');
  });

  document.querySelector('#loginModal .modal__close-button').addEventListener('click', () => {
    closeModal('loginModal');
  });

  document.getElementById('loginModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal('loginModal');
    }
  });

  // SIGNUP MODAL
  document.querySelector('.header__signup').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('signupModal');
  });

  document.querySelector('#signupModal .modal__close-button').addEventListener('click', () => {
    closeModal('signupModal');
  });

  document.getElementById('signupModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal('signupModal');
    }
  });

  // SWITCH BETWEEN LOGIN & SIGNUP MODALS
  document.querySelector('#loginModal .modal__alt').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('loginModal');
    openModal('signupModal');
  });

  document.querySelector('#signupModal .modal__alt').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('signupModal');
    openModal('loginModal');
  });

});
