const element = document.getElementById('back-to-top');

window.onscroll = () => {
  if (window.pageYOffset > 190) {
    element.style.display = 'block';
    return;
  }
  element.style.display = 'none';
};

element.onclick = () => {
  window.scrollTo(0, 0);
};
