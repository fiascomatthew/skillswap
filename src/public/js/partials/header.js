// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Open the modal
  document.querySelector('.header__signup').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default button behavior
    document.querySelector('.modal--overlay').style.display = 'block';
  });

  // Close the modal
  document.querySelector('.modal__close-button').addEventListener('click', () => {
    document.querySelector('.modal--overlay').style.display = 'none';
  });

  // Close the modal by clicking outside of it
  document.querySelector('.modal--overlay').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});
