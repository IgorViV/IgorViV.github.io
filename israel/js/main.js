'use strict';

// modal:
(function myModal() {
  var buttonOrderCall = document.querySelector('.page-header__btn');
  var formWantToGo = document.forms.want;
  var formContacts = document.forms.contacts;
  var pageModalOverlay = document.querySelector('.modal-overlay');
  var modalCall = pageModalOverlay.querySelector('.modal--order-call');
  var formModalCall = document.forms.modalcall;
  var nameModalCall = formModalCall.elements.name;
  var phoneModalCall = formModalCall.elements.phone;
  var modalAccepted = pageModalOverlay.querySelector('.modal--accepted');
  var btnModalAccepted = modalAccepted.querySelector('.modal__btn--accepted');
  var btnModalCallClose = pageModalOverlay.querySelector('.modal__btn-close--call');
  var btnModalAcceptedClose = pageModalOverlay.querySelector('.modal__btn-close--accepted');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('name');
  } catch (err) {
    isStorageSupport = false;
  }

  if (formWantToGo) {
    if (formWantToGo.elements.phone) {
      formWantToGo.elements.phone.onfocus = function () {
        // getValueLocalStorage(formWantToGo);
      };
    }
    formWantToGo.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!formWantToGo.elements.phone.validity.valid) {
        formWantToGo.elements.phone.style.borderColor = '#ff0000';
      }
      if (formWantToGo.elements.phone.validity.valid) {
        // setValueLocalStorage(formWantToGo);
        onModalOkOpen();
      }
    });

    onValidityElementForm(formWantToGo);
  }

  if (formContacts) {
    if (formContacts.elements.name) {
      formContacts.elements.name.onfocus = function () {
        // getValueLocalStorage(formContacts);
      };
    }
    formContacts.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!formContacts.elements.name.validity.valid) {
        formContacts.elements.name.style.borderColor = '#ff0000';
      }
      if (!formContacts.elements.phone.validity.valid) {
        formContacts.elements.phone.style.borderColor = '#ff0000';
      }
      if (formContacts.elements.name.validity.valid && formContacts.elements.phone.validity.valid) {
        // setValueLocalStorage(formContacts);
        onModalOkOpen();
        // formContacts.submit();
      }
    });

    onValidityElementForm(formContacts);
  }

  if (formModalCall) {
    formModalCall.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (nameModalCall.validity.valid || phoneModalCall.validity.valid) {
        // setValueLocalStorage(formModalCall);
        onModalOkOpen();
        onValidityElementForm(formModalCall);
      }
    });
  }

  if (buttonOrderCall) {
    buttonOrderCall.addEventListener('click', function (evt) {
      evt.preventDefault();
      onModalCallOpen();
      // getValueLocalStorage(formModalCall);
    });
  }

  if (btnModalCallClose) {
    btnModalCallClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      onModalCallClose();
    });
  }

  if (btnModalAccepted) {
    btnModalAccepted.addEventListener('click', function (evt) {
      evt.preventDefault();
      onModalOkClose();
    });

    btnModalAccepted.addEventListener('keydown', function (evt) {
      isEnterEvent(evt, onModalOkClose);
    });
  }

  if (btnModalAcceptedClose) {
    btnModalAcceptedClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      onModalOkClose();
    });
  }

  document.addEventListener('keydown', function (evt) {
    isEscEvent(evt, onModalCallClose);
    isEscEvent(evt, onModalOkClose);
  });

  function onValidityElementForm(currentForm) {
    if (currentForm.elements.name) {
      currentForm.elements.name.addEventListener('input', function () {
        if (!currentForm.elements.name.validity.valid) {
          currentForm.elements.name.style.borderColor = '#ff0000';
        } else {
          currentForm.elements.name.style.borderColor = '#9A9A9A';
        }
      });
    }
    if (currentForm.elements.phone) {
      currentForm.elements.phone.addEventListener('input', function () {
        if (!currentForm.elements.phone.validity.valid) {
          currentForm.elements.phone.style.borderColor = '#ff0000';
        } else {
          currentForm.elements.phone.style.borderColor = '#9A9A9A';
        }
      });
    }
  }

  function setValueLocalStorage(currentForm) {
    if (isStorageSupport) {
      if (currentForm.elements.name) {
        localStorage.setItem('name', currentForm.elements.name.value);
      }
      if (currentForm.elements.phone) {
        localStorage.setItem('phone', currentForm.elements.phone.value);
      }
    }
  }

  function getValueLocalStorage(currentForm) {
    if (storage) {
      if (currentForm.elements.name) {
        currentForm.elements.name.value = storage;
        if (!currentForm.elements.phone.validity.valid) {
          currentForm.elements.phone.style.borderColor = '#ff0000';
        } else {
          currentForm.elements.phone.style.borderColor = '#9A9A9A';
        }
      }
      if (currentForm.elements.phone) {
        currentForm.elements.phone.focus();
        currentForm.elements.phone.value = localStorage.getItem('phone');
        if (!currentForm.elements.phone.validity.valid) {
          currentForm.elements.phone.style.borderColor = '#ff0000';
        } else {
          currentForm.elements.phone.style.borderColor = '#9A9A9A';
        }
      }
    } else {
      if (currentForm.elements.name) {
        currentForm.elements.name.focus();
      }
    }
  }

  function onModalCallOpen() {
    if (pageModalOverlay.classList.contains('modal-overlay--hidden')) {
      pageModalOverlay.classList.remove('modal-overlay--hidden');
    }
    if (modalCall.classList.contains('modal--hidden')) {
      modalCall.classList.remove('modal--hidden');
    }
  }

  function onModalCallClose() {
    if (!pageModalOverlay.classList.contains('modal-overlay--hidden')) {
      pageModalOverlay.classList.add('modal-overlay--hidden');
    }
    if (!modalCall.classList.contains('modal--hidden')) {
      modalCall.classList.add('modal--hidden');
    }
  }

  function onModalOkOpen() {
    if (pageModalOverlay.classList.contains('modal-overlay--hidden')) {
      pageModalOverlay.classList.remove('modal-overlay--hidden');
    }
    if (modalAccepted.classList.contains('modal--hidden')) {
      modalAccepted.classList.remove('modal--hidden');
    }
  }

  function onModalOkClose() {
    if (!pageModalOverlay.classList.contains('modal-overlay--hidden')) {
      pageModalOverlay.classList.add('modal-overlay--hidden');
    }
    if (!modalAccepted.classList.contains('modal--hidden')) {
      modalAccepted.classList.add('modal--hidden');
    }
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }
}());

// life slider:
(function sliderLife() {
  var blockLife = document.querySelector('.life');
  var lifeSlider = blockLife.querySelector('.life__slider');
  var slides = lifeSlider.querySelectorAll('.life__slide');
  var sliderControls = blockLife.querySelector('.life__slider-controls');
  var sliderBtn = sliderControls.querySelectorAll('.life__btn');
  var currentNumberSlide = 0;
  var clickPosition = {
    xStart: 0,
    xEnd: 0,
    xShift: 0
  };
  var currentSlideOffset = 0;
  var MOBILE_BREAKPOINT = 767;

  lifeSlider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    clickPosition.xStart = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      clickPosition.xEnd = moveEvt.clientX;
      clickPosition.xShift = clickPosition.xEnd - clickPosition.xStart;

      if (document.documentElement.clientWidth <= MOBILE_BREAKPOINT) {
        var transValue = 'transform: translateX(' + (currentSlideOffset + clickPosition.xShift) + 'px)';
        lifeSlider.setAttribute('style', transValue);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (document.documentElement.clientWidth <= MOBILE_BREAKPOINT) {
        var slideWidth = parseFloat(getComputedStyle(slides[currentNumberSlide]).width);

        if (clickPosition.xShift < slideWidth / 2) {
          var transValue = 'transform: translateX(' + currentSlideOffset + 'px)';
          lifeSlider.setAttribute('style', transValue);
        }

        currentSlideOffset = currentSlideOffset + clickPosition.xShift;

        if (currentSlideOffset < 0 && clickPosition.xShift >= slideWidth / 2) {

          currentNumberSlide++; // вперед
          addBtnActive(sliderBtn[currentNumberSlide]);

          transformSlider(currentNumberSlide);
          // currentSlideOffset = (currentNumberSlide + 1) * parseFloat(getComputedStyle(slides[currentNumberSlide]).width)

        }

        if (currentSlideOffset > 0) {
          // currentNumberSlide--; // назад
          // addBtnActive(sliderBtn[currentNumberSlide]);

          // transformSlider(currentNumberSlide);
        }
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  addBtnActive(sliderBtn[currentNumberSlide]);

  transformSlider(currentNumberSlide);

  if (sliderControls) {
    sliderControls.onclick = function (evt) {
      evt.preventDefault();
      var btn = evt.target.closest('button');
      if (!btn) {
        return;
      }
      if (!sliderControls.contains(btn)) {
        return;
      }
      addBtnActive(btn);
      removeBtnActive(sliderBtn[currentNumberSlide]);

      currentNumberSlide = getCurrentIndexBtn(btn);

      transformSlider(currentNumberSlide);
    };
  }

  window.addEventListener('resize', function () {
    if (document.documentElement.clientWidth >= MOBILE_BREAKPOINT) {
      var numberSlide = 0;
      transformSlider(numberSlide);

      addBtnActive(sliderBtn[numberSlide]);

      if (numberSlide !== currentNumberSlide) {
        removeBtnActive(sliderBtn[currentNumberSlide]);
        currentNumberSlide = 0;
      }
    }

  });

  function addBtnActive(targetBtn) {
    if (!targetBtn.classList.contains('life__btn--active')) {
      targetBtn.classList.add('life__btn--active');
    }
  }

  function removeBtnActive(prevBtn) {
    if (prevBtn.classList.contains('life__btn--active')) {
      prevBtn.classList.remove('life__btn--active');
    }
  }

  function getCurrentIndexBtn(targetBtn) {
    return targetBtn.getAttribute('data-number-of');
  }

  function transformSlider(currentIndex) {
    var transValue = 'transform: translateX(' + currentIndex * (-20) + '%)';
    lifeSlider.setAttribute('style', transValue);
  }
}());

// accordion:
(function myAccordion() {
  var accordion = document.querySelector('.accordion');
  var ENTER_KEYCODE = 13;

  if (accordion) {
    accordion.addEventListener('click', function (evt) {
      evt.preventDefault();
      onTabChangState(evt);
    });

    // добавить открытие вкладок с клавиатуры
  }

  function onTabChangState (evt) {
    var elemDt = evt.target.closest('dt');
    if (!elemDt) {
      return;
    }
    if (!accordion.contains(elemDt)) {
      return;
    }
    elemDt.classList.toggle('accordion__item-header--active');
  }

  // function isEnterEvent(evt, action) {
  //   if (evt.keyCode === ENTER_KEYCODE) {
  //     action();
  //   }
  // }
}());

// feedback slider:
(function sliderFeedback() {
  var feedbackSlider = document.querySelector('.feedback__slider');
  var feedbackSliderList = feedbackSlider.querySelector('.feedback__slider-list');
  var feedbackSliderItems = feedbackSlider.querySelectorAll('.feedback__slider-item');
  var feedbackSliderControl = feedbackSlider.querySelector('.feedback__slider-controls');
  var feedbackBtnPrev = feedbackSlider.querySelector('.feedback__btn--prev');
  var feedbackBtnNext = feedbackSlider.querySelector('.feedback__btn--next');
  var feedbackSlideNumber = feedbackSlider.querySelector('.feedback__slider-number');
  var feedbackSlideSum = feedbackSlider.querySelector('.feedback__slider-sum');
  var positionLeftItem = 0;
  var transformValue = 0;
  var position = {
    getMin: 0,
    getMax: feedbackSliderItems.length - 1
  };

  setSliderNumber(1);
  setSumSlides(feedbackSliderItems.length);

  feedbackSliderControl.addEventListener('click', function (evt) {
    evt.preventDefault();
    var btn = evt.target.closest('button');
    if (!btn) {
      return;
    }
    if (!feedbackSliderControl.contains(btn)) {
      return;
    }

    var direction = btn.classList.contains('feedback__btn--next') ? 'right' : 'left';

    transformFeedbackItem(direction);
  });

  window.addEventListener('resize', function () {
    setSliderNumber(1);
    feedbackSliderList.style.transform = 'translateX(0%)';
    if (!feedbackBtnPrev.disabled) {
      feedbackBtnPrev.setAttribute('disabled', 'true');
    }
  });

  function transformFeedbackItem(direction) {
    var sliderWidth = parseFloat(getComputedStyle(feedbackSliderList).width);
    var sliderItemWidth = parseFloat(getComputedStyle(feedbackSliderItems[0]).width);
    var stepTransform = sliderItemWidth / sliderWidth * 100;

    if (direction === 'right') {
      if (positionLeftItem >= position.getMax) {
        return;
      }
      if (feedbackBtnPrev.disabled) {
        feedbackBtnPrev.removeAttribute('disabled');
      }
      if (!feedbackBtnPrev.disabled && positionLeftItem + 1 >= position.getMax) {
        feedbackBtnNext.setAttribute('disabled', 'true');
      }

      positionLeftItem++;
      transformValue -= stepTransform;
      setSliderNumber(positionLeftItem + 1);
    }
    if (direction === 'left') {
      if (positionLeftItem <= position.getMin) {
        return;
      }
      if (feedbackBtnNext.disabled) {
        feedbackBtnNext.removeAttribute('disabled');
      }
      if (!feedbackBtnNext.disabled && positionLeftItem - 1 <= position.getMin) {
        feedbackBtnPrev.setAttribute('disabled', 'true');
      }

      positionLeftItem--;
      transformValue += stepTransform;
      setSliderNumber(positionLeftItem + 1);
    }

    feedbackSliderList.style.transform = 'translateX(' + transformValue + '%)';
  }

  function setSliderNumber(indexSlide) {
    feedbackSlideNumber.textContent = indexSlide;
  }

  function setSumSlides(sumSlides) {
    feedbackSlideSum.textContent = sumSlides;
  }
}());
