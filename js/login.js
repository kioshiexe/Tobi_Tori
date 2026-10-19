const loginError = document.getElementById('login-error');
const errorType = new URLSearchParams(window.location.search).get('error');

if (errorType === 'invalid') {
	loginError.textContent = 'Invalid username or password.';
	loginError.hidden = false;
} else if (errorType === 'unavailable') {
	loginError.textContent = 'Login is temporarily unavailable. Please try again later.';
	loginError.hidden = false;
}
