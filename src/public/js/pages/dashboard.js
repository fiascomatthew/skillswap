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

    editBioError.style.display = 'none';

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

      if (data.error) {
        editBioError.style.display = 'block';
        return;
      }

      // Redirect on successful update
      window.location.href = '/dashboard';
    } catch (err) {
      window.location.href = '/error';
    }
  });

  // ADD INTEREST FORM MODAL

  const addInterestBtn = document.getElementById('add-interest-btn');
  const addInterestModal = document.getElementById('addInterestModal');
  const closeaddInterestBtn = document.getElementById('addInterestCloseBtn');
  const addInterestError = document.getElementById('addInterestError');

  if (addInterestBtn && addInterestModal && closeaddInterestBtn) {
    // Open modal
    addInterestBtn.addEventListener('click', () => {
      openModal('addInterestModal');
    });

    // Close modal on close button click
    closeaddInterestBtn.addEventListener('click', () => {
      closeModal('addInterestModal');
    });

    // Close modal when clicking outside content
    addInterestModal.addEventListener('click', (e) => {
      if (e.target === addInterestModal) {
        closeModal('addInterestModal');
      }
    });
  }

  // ADD INTEREST FORM VALIDATION

  const addInterestForm = document.getElementById('addInterestForm');
  const addInterestSelect = document.getElementById('addInterest');

  addInterestForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    addInterestError.style.display = 'none';

    const interestId = addInterestSelect.value;

    try {
      const response = await fetch('/dashboard/interest', {
        method: 'POST',
        body: `interestId=${encodeURIComponent(interestId)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();

      if (data.error) {
        addInterestError.textContent = data.message || 'Une erreur est survenue.';
        addInterestError.style.display = 'block';
        return;
      }

      // Redirect on successful update
      window.location.href = '/dashboard';
    } catch (err) {
      window.location.href = '/error';
    }
  });

  // ADD SKILL FORM MODAL

  const addSkillBtn = document.getElementById('add-skill-btn');
  const addSkillModal = document.getElementById('addSkillModal');
  const closeaddSkillBtn = document.getElementById('addSkillCloseBtn');
  const addSkillError = document.getElementById('addSkillError');

  if (addSkillBtn && addSkillModal && closeaddSkillBtn) {
    // Open modal
    addSkillBtn.addEventListener('click', () => {
      openModal('addSkillModal');
    });

    // Close modal on close button click
    closeaddSkillBtn.addEventListener('click', () => {
      closeModal('addSkillModal');
    });

    // Close modal when clicking outside content
    addSkillModal.addEventListener('click', (e) => {
      if (e.target === addSkillModal) {
        closeModal('addSkillModal');
      }
    });
  }

  // ADD SKILL FORM VALIDATION

  const addSkillForm = document.getElementById('addSkillForm');
  const addSkillSelect = document.getElementById('addSkill');

  addSkillForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    addSkillError.style.display = 'none';

    const skillId = addSkillSelect.value;

    try {
      const response = await fetch('/dashboard/skill', {
        method: 'POST',
        body: `skillId=${encodeURIComponent(skillId)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();

      if (data.error) {
        addSkillError.textContent = data.message || 'Une erreur est survenue.';
        addSkillError.style.display = 'block';
        return;
      }

      // Redirect on successful update
      window.location.href = '/dashboard';
    } catch (err) {
      window.location.href = '/error';
    }
  });

  //REMOVE INTEREST FORM MODAL
  const removeInterestBtn = document.getElementById('remove-interest-btn');
  const removeInterestModal = document.getElementById('removeInterestModal');
  const closeremoveInterestBtn = document.getElementById('removeInterestCloseBtn');
  const removeInterestError = document.getElementById('removeInterestError');
  if (removeInterestBtn && removeInterestModal && closeremoveInterestBtn) {
    // Open modal
    removeInterestBtn.addEventListener('click', () => {
      openModal('removeInterestModal');
    });

    // Close modal on close button click
    closeremoveInterestBtn.addEventListener('click', () => {
      closeModal('removeInterestModal');
    });

    // Close modal when clicking outside content
    removeInterestModal.addEventListener('click', (e) => {
      if (e.target === removeInterestModal) {
        closeModal('removeInterestModal');
      }
    });
  }
});
