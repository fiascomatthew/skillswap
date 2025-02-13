// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // LOGIN FORM PAGE VALIDATION

  const loginForm = document.getElementById('loginPageForm');
  const loginError = document.getElementById('loginPageError');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;

    // Reset previous errors only inside the loginForm
    for (const error of loginForm.querySelectorAll('.login__error')) {
      error.style.display = 'none';
    }
    loginError.style.display = 'none';

    // Validate inputs only inside the loginForm
    for (const input of loginForm.querySelectorAll('.login__input')) {
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

        // Get the 'returnTo' value from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo');

        // Redirect on successful login
        window.location.href = returnTo ? returnTo : '/';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });
});
