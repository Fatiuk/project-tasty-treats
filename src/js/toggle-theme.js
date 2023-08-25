import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

document.addEventListener('DOMContentLoaded', function () {
  const themeToggle1 = document.querySelector('.checkbox');
  const themeToggle2 = document.querySelector('.checkbox-burger');
  const body = document.body;

  themeToggle1.addEventListener('click', toggleTheme);
  themeToggle2.addEventListener('click', toggleTheme);

  function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
      applyTheme('light');
    } else {
      applyTheme('dark');
    }
  }

  function applyTheme(theme) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
  }

  let selectedTheme = localStorage.getItem('theme');
  if (selectedTheme === null) {
    selectedTheme = 'light'; // по умолчанию
  }

  applyTheme(selectedTheme);
  themeToggle1.checked = selectedTheme === 'dark';
  themeToggle2.checked = selectedTheme === 'dark';
});
