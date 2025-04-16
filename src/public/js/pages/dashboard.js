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
    editUserError.style.display = 'none';
  }

  // USER EDIT FORM MODAL

  const editUserBtn = document.getElementById('edit-user-btn');
  const editUserModal = document.getElementById('editUserModal');
  const closeEditUserBtn = document.getElementById('editUserCloseBtn');
  const editUserError = document.getElementById('editUserError');

  if (editUserBtn && editUserModal && closeEditUserBtn) {
    // Open modal
    editUserBtn.addEventListener('click', () => {
      openModal('editUserModal');
    });

    // Close modal on close button click
    closeEditUserBtn.addEventListener('click', () => {
      closeModal('editUserModal');
    });

    // Close modal when clicking outside content
    editUserModal.addEventListener('click', (e) => {
      if (e.target === editUserModal) {
        closeModal('editUserModal');
      }
    });
  }

  // USER EDIT FORM VALIDATION

  const editUserForm = document.getElementById('editUserForm');

  editUserForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the editUserForm
    for (const error of editUserForm.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    editUserError.style.display = 'none';

    // Validate inputs only inside the editUserForm
    for (const input of editUserForm.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    if (isValid) {
      const formData = new URLSearchParams(new FormData(editUserForm));

      try {
        const response = await fetch('/dashboard/user', {
          method: 'PATCH',
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
          // Display the general error
          editUserError.style.display = 'block';
          return;
        }

        // Redirect on successful update
        window.location.href = '/dashboard';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });

  // BIO EDIT FORM MODAL

  const editBioBtn = document.getElementById('edit-bio-btn');
  const editBioModal = document.getElementById('editBioModal');
  const closeEditBioBtn = document.getElementById('editBioCloseBtn');
  const editBioError = document.getElementById('editBioError');

  if (editBioBtn && editBioModal && closeEditBioBtn) {
    // Open modal
    editBioBtn.addEventListener('click', () => {
      openModal('editBioModal');
    });

    // Close modal on close button click
    closeEditBioBtn.addEventListener('click', () => {
      closeModal('editBioModal');
    });

    // Close modal when clicking outside content
    editBioModal.addEventListener('click', (e) => {
      if (e.target === editBioModal) {
        closeModal('editBioModal');
      }
    });
  }

  // BIO EDIT FORM VALIDATION

  const editBioForm = document.getElementById('editBioForm');

  editBioForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    let isValid = true;

    // Reset previous errors only inside the editBioForm
    for (const error of editBioForm.querySelectorAll('.modal__error')) {
      error.style.display = 'none';
    }

    editBioError.style.display = 'none';

    // Validate inputs only inside the editBioForm
    for (const input of editBioForm.querySelectorAll('.modal__input')) {
      const error = document.getElementById(`${input.id}Error`);
      if (!input.value) {
        error.style.display = 'block';
        isValid = false;
      }
    }

    if (isValid) {
      const formData = new URLSearchParams(new FormData(editBioForm));

      try {
        const response = await fetch('/dashboard/bio', {
          method: 'PATCH',
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
          // Display the general error
          editBioError.style.display = 'block';
          return;
        }

        // Redirect on successful update
        window.location.href = '/dashboard';
      } catch (err) {
        window.location.href = '/error';
      }
    }
  });
});
