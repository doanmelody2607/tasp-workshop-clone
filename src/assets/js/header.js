/*
Hide header on scroll down & show on scroll up
*/

(() => {
  const header = document.querySelector('#header');
  let lastPos = document.documentElement.scrollTop || window.scrollY;

  window.addEventListener(
    'scroll',
    () => {
      const currPos = document.documentElement.scrollTop || window.scrollY;

      if (currPos > lastPos) {
        if (currPos > header.offsetHeight) {
          header.classList.add('-translate-y-full');
          header.classList.remove('shadow-md');
        }
      } else {
        header.classList.remove('-translate-y-full');
        header.classList.add('shadow-md');
      }

      lastPos = currPos;
    },
    false
  );
})();
