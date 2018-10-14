var navMain = document.querySelector('.page-nav');
var navToggle = document.querySelector('.page-nav__toggle');

if (navMain && navMain.classList.contains('page-nav--nojs')) {
navMain.classList.remove('page-nav--nojs');
navMain.classList.add('page-nav--closed');
}

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('page-nav--closed')) {
      navMain.classList.remove('page-nav--closed');
      navMain.classList.add('page-nav--opened');
    } else {
      navMain.classList.add('page-nav--closed');
      navMain.classList.remove('page-nav--opened');
    }
  });
