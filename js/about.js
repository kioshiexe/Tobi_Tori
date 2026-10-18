const accountButton = document.querySelector('.profile-button');
const accountMenu = document.getElementById('account-menu-panel');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    const darkModeEnabled = themeToggle.getAttribute('aria-checked') !== 'true';
    document.body.dataset.theme = darkModeEnabled ? 'dark' : 'light';
    themeToggle.setAttribute('aria-checked', String(darkModeEnabled));
});

accountButton.addEventListener('click', () => {
    const expanded = accountButton.getAttribute('aria-expanded') === 'true';
    accountButton.setAttribute('aria-expanded', String(!expanded));
    accountMenu.hidden = expanded;
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.account-menu')) {
        accountButton.setAttribute('aria-expanded', 'false');
        accountMenu.hidden = true;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !accountMenu.hidden) {
        accountButton.setAttribute('aria-expanded', 'false');
        accountMenu.hidden = true;
        accountButton.focus();
    }
});
