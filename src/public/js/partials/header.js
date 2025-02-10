// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Function to open a modal
  function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  // Function to close a modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';

    // Reset the form inside the modal
    const form = modal.querySelector('form');
    if (form) {
      form.reset(); // Reset form fields
    }

    // Hide error messages after closing modal
    const errorMessages = modal.querySelectorAll('.modal__error');
    for (const error of errorMessages) {
      error.style.display = 'none';
    }
  }

  // LOGIN MODAL
  document.querySelector('.header__login').addEventListener('click', (e) => {
    e.preventDefault();
    openModal('loginModal');
  });

  document.querySelector('#loginModal .modal__close-button').addEventListener('click', () => {
    closeModal('loginModal');
  });

  document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
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
    if (e.target === e.currentTarget) {
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

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the registerForm
    for (const error of form.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    // Validate inputs only inside the registerForm
    for (const input of form.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    // Check if passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchingPasswordsError = document.getElementById('matchingPasswordsError');

    if (password && confirmPassword && password !== confirmPassword) {
      matchingPasswordsError.style.display = 'block';
      isValid = false;
    }

    // Check terms and conditions checkbox inside the registerModal
    const terms = form.querySelector('#terms');
    const termsError = document.getElementById('termsError');
    if (!terms.checked) {
      termsError.style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      form.submit(); // Submit form if valid
    }
  });

  // LOGIN FORM VALIDATION

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the loginForm
    for (const error of loginForm.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    // Validate inputs only inside the loginForm
    for (const input of loginForm.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    if (isValid) {
      loginForm.submit(); // Submit form if valid
    }
  });
});
