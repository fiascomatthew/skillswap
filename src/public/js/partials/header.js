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

  document.getElementById('loginModal').addEventListener('click', function (e) {
    if (e.target === this) {
      closeModal('loginModal');
    }
  });

  // REGISTER MODAL
  document.querySelector('.header__register').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('registerModal');
  });

  document.querySelector('#registerModal .modal__close-button').addEventListener('click', () => {
    closeModal('registerModal');
  });

  document.getElementById('registerModal').addEventListener('click', (e) => {
    if (e.target === this) {
      closeModal('registerModal');
    }
  });

  // SWITCH BETWEEN LOGIN & REGISTER MODALS
  document.querySelector('#loginModal .modal__alt').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('loginModal');
    openModal('registerModal');
  });

  document.querySelector('#registerModal .modal__alt').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('registerModal');
    openModal('loginModal');
  });

  // REGISTER FORM VALIDATION

  const form = document.getElementById('registerForm');

  const modal = document.getElementById('registerModal');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the registerModal
    for (const error of modal.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    // Validate inputs only inside the registerModal
    for (const input of modal.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    // Check terms and conditions checkbox inside the registerModal
    const terms = modal.querySelector('#terms');
    const termsError = document.getElementById('termsError');
    if (!terms.checked) {
      termsError.style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      form.submit(); // Submit form if valid
    }
  });
});
