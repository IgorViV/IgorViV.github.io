"use strict";

var navMain = document.querySelector('.page-menu');
var navToggle = document.querySelector('.page-menu__button');

if (navMain && navMain.classList.contains('page-menu--no-js')) {
navMain.classList.remove('page-menu--no-js');
navMain.classList.add('page-menu--close');
}
  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('page-menu--close')) {
      navMain.classList.remove('page-menu--close');
      navMain.classList.add('page-menu--open');
    } else {
      navMain.classList.add('page-menu--close');
      navMain.classList.remove('page-menu--open');
    }
  });
