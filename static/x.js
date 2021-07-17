document.querySelectorAll('img').forEach((item) => {
	item.addEventListener('click', (event) => {
		window.location.href = event.target.getAttribute('src');
	});
});
