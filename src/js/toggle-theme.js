document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.querySelector('.checkbox');
  const body = document.body;

  const selectedTheme = localStorage.getItem('theme');
  if (selectedTheme === 'dark') {
    applyDarkTheme();
    themeToggle.checked = true;
  } else {
    applyLightTheme();
    themeToggle.checked = false;
  }

  themeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-theme')) {
      applyLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  });

  function applyLightTheme() {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }

  function applyDarkTheme() {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
});
