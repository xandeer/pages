window.onload = () => {
  // Open image in current window.
  document.querySelectorAll('img').forEach((item) => {
	  item.addEventListener('click', (event) => {
		  window.location.href = event.target.getAttribute('src');
	  });
  });

  // Insert audio tag.
  document.querySelectorAll('a').forEach((it) => {
    if (it.href.endsWith('mp3') || it.href.endsWith('m4a')) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = it.href;
      audio.addEventListener('click', (e) => {
        e.stopPropagation();
      })
      it.parentElement.append(audio);
      it.style.display = 'none';
    }
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
    if (preview && !preview.classList.contains('hide')) {
      hide(preview);
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
      show(preview);
    } else {
      generatePng();
    }
    e.stopPropagation();
    e.preventDefault();
  });
};

function generatePng() {
  const node = document.getElementById('content');
  const maxSize = 16777216;
  let ratio = devicePixelRatio;
  if (node.offsetWidth * node.offsetHeight * ratio * ratio > maxSize) {
    ratio = devicePixelRatio / 2;
  }

  domtoimage
    .toPng(node, {
      width: node.offsetWidth * ratio,
      height: node.offsetHeight * ratio,
      style: {
        transform: `scale(${ratio})`,
        transformOrigin: `top left`,
        width: `${node.offsetWidth}px`,
        height: `${node.offsetHeight}px`,
      },
      // Exclude head dl info, like author or reading time.
      filter: n => n.tagName !== 'DL'
    })
    .then(function (dataUrl) {
      const img = new Image();
      img.classList.add('shared-preview');
      img.src = dataUrl;
      img.title = document.title + '.png';
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
}


function hide(view) {
  if (view && view.classList) {
    view.classList.add('hide');
  }
}

function show(view) {
  if (view && view.classList) {
    view.classList.remove('hide');
  }
}
