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

  // Отримання поточної теми з localStorage та встановлення стану перемикачів
  const selectedTheme = localStorage.getItem('theme');
  applyTheme(selectedTheme);
  themeToggle1.checked = selectedTheme === 'dark';
  themeToggle2.checked = selectedTheme === 'dark';
});

// document.addEventListener('DOMContentLoaded', function () {
//   const themeToggle1 = document.querySelector('.checkbox');
//   const themeToggle2 = document.querySelector('.checkbox-burger');
//   const body = document.body;

//   const selectedTheme = localStorage.getItem('theme');
//   if (selectedTheme === 'dark') {
//     applyDarkTheme();
//     themeToggle1.checked = true;
//     themeToggle2.checked = true;
//   } else {
//     applyLightTheme();
//     themeToggle1.checked = false;
//     themeToggle2.checked = false;
//   }

//   themeToggle1.addEventListener('click', toggleTheme);
//   themeToggle2.addEventListener('click', toggleTheme);

//   function toggleTheme() {
//     if (body.classList.contains('dark-theme')) {
//       applyLightTheme();
//       localStorage.setItem('theme', 'light');
//     } else {
//       applyDarkTheme();
//       localStorage.setItem('theme', 'dark');
//     }
//   }

//   function applyLightTheme() {
//     body.classList.remove('dark-theme');
//     body.classList.add('light-theme');
//   }

//   function applyDarkTheme() {
//     body.classList.remove('light-theme');
//     body.classList.add('dark-theme');
//   }
// });
