document.addEventListener('DOMContentLoaded', () => {
  // MANAGING TABS
  const tabs = document.querySelectorAll('.user__tab');
  const tabContents = document.querySelectorAll('.user__tab-content');

  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(`user-${targetId}`);

      // Remove active classes
      for (const t of tabs) {
        t.classList.remove('user__tab--active');
      }
      for (const content of tabContents) {
        content.classList.remove('user__tab-content--active');
      }

      // Add active classes to the clicked tab and corresponding content
      tab.classList.add('user__tab--active');
      targetContent.classList.add('user__tab-content--active');
    });
  }

  // MANAGING FOLLOW / UNFOLLOW BUTTON
  const form = document.querySelector('.user__follow-form');
  const button = form?.querySelector('.user__button--toggle-follow');
  const errorMessage = document.querySelector('.user__error-message');

  if (form && button) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Une erreur est survenue');
        }

        // UPDATE BUTTON TEXT
        button.textContent = data.isFollowing ? 'Ne plus suivre' : 'Suivre';

        // Hide error message if it was previously displayed
        errorMessage.style.display = 'none';
      } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
      }
    });
  }
});
