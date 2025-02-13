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
    loginError.style.display = 'none';
    registerError.style.display = 'none';
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

  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the registerForm
    for (const error of registerForm.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }
    const registerError = document.getElementById('registerError');
    registerError.style.display = 'none';

    // Validate inputs only inside the registerForm
    for (const input of registerForm.querySelectorAll('.modal__input')) {
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
    const terms = registerForm.querySelector('#terms');
    const termsError = document.getElementById('termsError');
    if (!terms.checked) {
      termsError.style.display = 'block';
      isValid = false;
    }

    if (isValid) {
      const formData = new URLSearchParams(new FormData(registerForm));

      try {
        const response = await fetch('/register', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();

        if (data.violation) {
          window.location.href = '/error';
          return;
        }

        if (data.error) {
          // Display the general register error
          registerError.style.display = 'block';
          return;
        }

        // Redirect on successful register
        window.location.href = '/';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });

  // LOGIN FORM VALIDATION

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the loginForm
    for (const error of loginForm.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    const loginError = document.getElementById('loginError');
    loginError.style.display = 'none';

    // Validate inputs only inside the loginForm
    for (const input of loginForm.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    if (isValid) {
      const formData = new URLSearchParams(new FormData(loginForm));

      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = await response.json();

        if (data.violation) {
          window.location.href = '/error';
          return;
        }

        if (data.error) {
          // Display the general login error
          loginError.style.display = 'block';
          return;
        }

        // Redirect on successful login
        window.location.href = '/';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });
});
