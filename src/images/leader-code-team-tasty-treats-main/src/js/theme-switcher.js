const body = document.querySelector('body');
const switcher = document.querySelectorAll('.switcher-input');

if (switcher.length > 0) {
  swicherDefaultPosition();
  switcher.forEach(switcherBtn => {
    switcherBtn.addEventListener('change', swicherChange);
  });
}

function swicherDefaultPosition() {
  if (localStorage.theme === 'dark') {
    body.classList.add('dark-theme');
    check();
  }
}

function swicherChange() {
  if (!body.classList.contains('dark-theme')) {
    body.classList.add('dark-theme');
    localStorage.theme = 'dark';
    check();
    return;
  }
  body.classList.remove('dark-theme');
  localStorage.theme = 'light';
  uncheck();
}

function check() {
  switcher.forEach(switcherBtn => {
    switcherBtn.checked = true;
  });
}

function uncheck() {
  switcher.forEach(switcherBtn => {
    switcherBtn.checked = false;
  });
}
