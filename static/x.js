window.onload = () => {
  // Open image in current window.
  document.querySelectorAll('img').forEach((item) => {
	  item.addEventListener('click', (event) => {
		  window.location.href = event.target.getAttribute('src')
	  })
  })

  // Make the top content touch easy.
  document.querySelector('body').classList.add('touch-easy')
  location.hash = 'content'

  // Scroll half pages when click on document.
  let hasSelection = false
  document.addEventListener('touchend', () => {
    hasSelection = !!window.getSelection().toString()
  })
  document.addEventListener('click', (e) => {
    if (!hasSelection) {
      const dir = e.pageX * 2 > document.body.clientWidth ? 1 : -1
      const top = dir * window.screen.height / 2
      scrollBy({
        top,
        left: 0,
        behavior: 'smooth'
      })
    }
  })
}
