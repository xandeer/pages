window.onload = () => {
  // Open image in current window.
  document.querySelectorAll('img').forEach((item) => {
	  item.addEventListener('click', (event) => {
		  window.location.href = event.target.getAttribute('src');
	  });
  });

  // Make the top content touch easy.
  document.querySelector('body').classList.add('touch-easy');
  location.hash = 'content';

  // Scroll half pages when click on document.
  let hasSelection = false;
  document.addEventListener('touchend', () => {
    hasSelection = !!window.getSelection().toString();
  });
  document.addEventListener('click', (e) => {
    const preview = document.querySelector('.shared-preview');
    if (preview) {
      preview.classList.add('hide');
    } else if (!hasSelection) {
      const dir = e.pageX * 2 > document.body.clientWidth ? 1 : -1;
      const top = dir * window.screen.height / 2;
      scrollBy({
        top,
        left: 0,
        behavior: 'smooth'
      });
    }
  });

  // Generate an image to share.
  document.getElementById('share-img').addEventListener('click', (e) => {
    const preview = document.querySelector('.shared-preview.hide')
    if (preview) {
      preview.classList.remove('hide');
    } else {
      generatePng();
    }
    e.stopPropagation();
    e.preventDefault();
  });
};

function generatePng() {
  var node = document.getElementById('content');

  domtoimage
    .toPng(node, {
      width: node.offsetWidth * devicePixelRatio,
      height: node.offsetHeight * devicePixelRatio,
      style: {
        transform: `scale(${devicePixelRatio})`,
        transformOrigin: `top left`,
        width: `${node.offsetWidth}px`,
        height: `${node.offsetHeight}px`,
      }
    })
    .then(function (dataUrl) {
      const img = new Image();
      img.classList.add('shared-preview');
      img.src = dataUrl;
      img.title = document.title + '.png';
      document.body.appendChild(img);
    })
}
