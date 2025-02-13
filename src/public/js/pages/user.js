document.addEventListener('DOMContentLoaded', () => {
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
});
