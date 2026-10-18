const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const metricCards = Array.from(document.querySelectorAll('[data-tab-target]'));
const currentViewLabel = document.getElementById('current-view-label');
const brandHome = document.getElementById('brand-home');
const overviewTab = document.getElementById('tab-overview');
const accountButton = document.querySelector('.profile-button');
const accountMenu = document.getElementById('account-menu-panel');
const themeToggle = document.getElementById('theme-toggle');

function activateTab(tab, moveFocus = false) {
	tabs.forEach((item) => {
		const selected = item === tab;
		item.setAttribute('aria-selected', String(selected));
		item.tabIndex = selected ? 0 : -1;
		item.classList.toggle('active', selected);
	});

	panels.forEach((panel) => {
		panel.hidden = panel.id !== tab.getAttribute('aria-controls');
	});
	currentViewLabel.textContent = tab.dataset.label;

	if (moveFocus) tab.focus();
}

brandHome.addEventListener('click', (event) => {
	event.preventDefault();
	activateTab(overviewTab);
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

metricCards.forEach((card) => {
	card.addEventListener('click', () => {
		const destinationTab = document.getElementById(card.dataset.tabTarget);
		activateTab(destinationTab, true);
	});
});

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

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => activateTab(tab));
	tab.addEventListener('keydown', (event) => {
		let nextIndex = index;

		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			nextIndex = (index + 1) % tabs.length;
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			nextIndex = (index - 1 + tabs.length) % tabs.length;
		} else if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = tabs.length - 1;
		} else {
			return;
		}

		event.preventDefault();
		activateTab(tabs[nextIndex], true);
	});
});