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

  // USER INFO MODAL

  const editUserBtn = document.getElementById('edit-user-btn');
  const editUserModal = document.getElementById('editUserModal');
  const closeEditUserBtn = document.getElementById('editUserCloseBtn');

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
});
