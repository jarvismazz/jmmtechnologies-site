// Progressive enhancement: the image links work without JavaScript.
(() => {
  const dialog = document.querySelector('.scape-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const allLinks = Array.from(document.querySelectorAll('[data-gallery-image]'));
  const gallery = Array.from(document.querySelectorAll('.scape-gallery [data-gallery-image]'));
  const fullImage = dialog.querySelector('[data-gallery-full]');
  const title = dialog.querySelector('#lightbox-title');
  const status = dialog.querySelector('[data-gallery-status]');
  const original = dialog.querySelector('[data-gallery-original]');
  let index = 0;
  let returnFocus = null;
  function showImage(nextIndex) {
    index = (nextIndex + gallery.length) % gallery.length;
    const link = gallery[index];
    fullImage.src = link.href;
    fullImage.alt = link.querySelector('img').alt;
    title.textContent = link.dataset.title;
    status.textContent = `Image ${index + 1} of ${gallery.length}`;
    original.href = link.href;
  }
  allLinks.forEach(link => link.addEventListener('click', event => {
    // Preserve open-in-new-tab and other native modified-link behavior.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    const matchedIndex = gallery.findIndex(item => item.href === link.href);
    showImage(matchedIndex < 0 ? 0 : matchedIndex);
    dialog.showModal();
    document.body.classList.add('scape-gallery-open');
  }));
  dialog.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-gallery-prev]').addEventListener('click', () => showImage(index - 1));
  dialog.querySelector('[data-gallery-next]').addEventListener('click', () => showImage(index + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const controls = Array.from(dialog.querySelectorAll('button:not([disabled]), a[href]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('scape-gallery-open');
    returnFocus?.focus();
  });
})();
