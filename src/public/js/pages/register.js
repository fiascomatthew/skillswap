// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // register FORM PAGE VALIDATION

  const registerForm = document.getElementById('registerPageForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;

    // Reset previous errors only inside the registerForm
    for (const error of registerForm.querySelectorAll('.register__error')) {
      error.style.display = 'none';
    }
    const registerError = document.getElementById('registerPageError');
    registerError.style.display = 'none';

    // Validate inputs only inside the registerForm
    for (const input of registerForm.querySelectorAll('.register__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    // Check if passwords match
    const password = document.getElementById('registerPagePassword').value;
    const confirmPassword = document.getElementById('registerPageConfirmPassword').value;
    const matchingPasswordsError = document.getElementById('registerPageMatchingPasswordsError');

    if (password && confirmPassword && password !== confirmPassword) {
      matchingPasswordsError.style.display = 'block';
      isValid = false;
    }

    // Check terms and conditions checkbox inside the registerModal
    const terms = registerForm.querySelector('#registerPageTerms');
    const termsError = document.getElementById('registerPageTermsError');
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

        // Get the 'returnTo' value from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');

        // Redirect on successful register
        window.location.href = returnTo ? returnTo : '/';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });
});
