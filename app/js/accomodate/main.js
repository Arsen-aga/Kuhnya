const burger = document.querySelector(".burger");
const popupMenu = document.querySelector(".popup-menu");
const body = document.querySelector("body");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  popupMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
});

const swiper = new Swiper(".slider-block__inner", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 12,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    540: {
      slidesPerView: 3,
    },
    750: {
      slidesPerView: 4,
    },
  },
});

Fancybox.bind("[data-fancybox]", {});

function getSliderItem(swiperTop, thumbSwiper, thumbSpace) {
  if (!(swiperTop && thumbSwiper)) return;
  const swiperThumb = new Swiper(thumbSwiper, {
    spaceBetween: thumbSpace,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    initialSlide: 5,
  });
  const swiper = new Swiper(swiperTop, {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperThumb,
    },
  });
}

if (document.querySelectorAll(".slider")) {
  const sliders = document.querySelectorAll(".slider");
  const swiperTop = document.querySelectorAll(".swiper-top");
  const thumbSwiper = document.querySelectorAll(".thumb-swiper");
  const mainSlidersSpace = 8;

  if (sliders.length === 1) {
    getSliderItem(swiperTop[0], thumbSwiper[0], mainSlidersSpace);
  } else {
    for (let i = 0; i < sliders.length; i++) {
      getSliderItem(swiperTop[i], thumbSwiper[i], mainSlidersSpace);
    }
  }

  const swiperTopPortfolio = document.querySelectorAll(
    "#portfolio-page .swiper-top, #case-page .swiper-top"
  );
  const thumbSwiperPortfolio = document.querySelectorAll(
    "#portfolio-page .thumb-swiper, #case-page .thumb-swiper"
  );
  const swiperPortfolioSpace = 18;

  if (swiperTopPortfolio.length === 1) {
    getSliderItem(
      swiperTopPortfolio[0],
      thumbSwiperPortfolio[0],
      swiperPortfolioSpace
    );
  }
  for (let i = 0; i < swiperTopPortfolio.length; i++) {
    getSliderItem(
      swiperTopPortfolio[i],
      thumbSwiperPortfolio[i],
      swiperPortfolioSpace
    );
  }
}

// document.addEventListener("DOMContentLoaded", () => {
const wrapper = document.querySelectorAll(".slider-items__item-slider");
wrapper.forEach((w) => {
  const elems = w.querySelectorAll(".slider-items__thumb");
  const prev = w.querySelector(".swiper-button-prev");
  const next = w.querySelector(".swiper-button-next");
  prev.addEventListener("click", checkCoordSlide(elems, 3, "prev"));
  next.addEventListener("click", () => {
    let count = 0;
    checkCoordSlide(elems, 3, "next", count);
  });
  checkCoordSlide(elems, 3);
});
// });

function checkCoordSlide(elems, index, value = "next") {
  let rest = elems.length - 4;

  elems.forEach((elem) => {
    // console.log(elem.offsetLeft);
    // console.log(+elem.style.width.replace("px", "") + 8 + elem.offsetLeft);

    if (elem.querySelector(".num-photo"))
      elem.querySelector(".num-photo").remove();
  });
  elems[index].insertAdjacentHTML("beforeend", getRestThePicture(rest));
}

function getRestThePicture(num) {
  return `
    <div class="num-photo">
      <p class="num-photo__text">+ <span class="num-photo__num">${num}</span> фото</p>
    </div>
  `;
}

if (document.querySelector(".filters-select__select")) {
  const selectContainers = document.querySelectorAll(".filters-select__select");

  selectContainers.forEach((container) => {
    const header = container.querySelector(".filters-select__select-header");
    const list = container.querySelector(".filters-select__select-list");
    const inputs = list.querySelectorAll("input");

    let initialHeaderText = header.textContent.trim(); // Сохраняем изначальное значение заголовка

    header.addEventListener("click", function (e) {
      e.preventDefault();
      if (list.style.display === "none" || list.style.display === "") {
        console.log(1);
        closeOtherSelects();
        list.style.display = "flex";
        header.classList.add("_active");
      } else {
        list.style.display = "none";
        header.classList.remove("_active");
      }
    });

    inputs.forEach((input) => {
      input.addEventListener("change", function () {
        let selectedTexts = Array.from(inputs)
          .filter((input) => input.checked)
          .map((input) => {
            const label = input.nextElementSibling; // Находим следующий элемент - метку (label)
            return label.textContent.trim(); // Возвращаем текст метки
          })
          .join(", ");

        header.textContent = selectedTexts || initialHeaderText; // Устанавливаем текст заголовка
      });
    });
  });

  function closeOtherSelects() {
    selectContainers.forEach((container) => {
      const list = container.querySelector(".filters-select__select-list");
      const header = container.querySelector(".filters-select__select-header");
      if (list.style.display === "flex") {
        list.style.display = "none";
        header.classList.remove("_active");
      }
    });
  }
  document.addEventListener("click", function (event) {
    const isClickInsideFilter = event.target.closest(".filters-select");
    if (!isClickInsideFilter) {
      // Клик был сделан вне .filters
      closeAllSelects();
    }
  });

  function closeAllSelects() {
    selectContainers.forEach((container) => {
      const list = container.querySelector(".filters-select__select-list");
      const header = container.querySelector(".filters-select__select-header");
      if (list.style.display === "flex") {
        list.style.display = "none";
        header.classList.remove("_active");
      }
    });
  }
}

// accordion
if (document.querySelector(".slider-items__item-accordion")) {
  const accordWrappers = document.querySelectorAll(
    ".slider-items__item-accordion"
  );

  accordWrappers.forEach((accordWrapper) => {
    const text = accordWrapper.querySelector(".slider-items__item-style");
    const btn = accordWrapper.querySelector(".slider-items__item-more");
    const btnText = btn.querySelector("span");

    btn.addEventListener("click", () => {
      text.classList.toggle("active");
      btnText.textContent =
        btnText.textContent === "Открыть" ? "Закрыть" : "Открыть";
    });
  });
}

// new mask
const phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs && phoneInputs.length) {
  const getInputsNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  const onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputsNumbersValue(input),
      formattedInputValue = "",
      selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        inputNumbersValue[1] =
          inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1];
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      // Russian phone number
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue +=
          "(" +
          (inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1]) +
          inputNumbersValue.substring(2, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      // Not Russian phone number
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = function (e) {
    const input = e.target;
    if (e.keyCode == 8 && getInputsNumbersValue(input).length === 1) {
      input.value = "";
    }
  };

  const onPhonePaste = function (e) {
    const input = e.target,
      pasted = e.clipboardData || window.clipboardData,
      inputNumbersValue = getInputsNumbersValue(input);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (!/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  const onPhoneClick = function (e) {
    const input = e.target;
    input.setSelectionRange(4, 4);
  };

  phoneInputs.forEach((input) => {
    input.setAttribute("maxlength", "18");
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
    input.addEventListener("click", onPhoneClick);
  });
}

// filters
if (document.querySelectorAll(".filters")) {
  const filters = document.querySelectorAll(".filters");

  filters.forEach((filter) => {
    const filterBtns = filter.querySelectorAll(".filters__btn");
    const filterItems = filter.querySelectorAll(".filters__item");
    const filterPrev = filter.querySelector(".filters__prev");
    const filterNext = filter.querySelector(".filters__next");

    let count = 0;

    filterBtns.forEach(function (btn, index) {
      btn.addEventListener("click", function (e) {
        count = index;
        if (filterPrev && filterNext) {
          hiddenArrow(filterNext, filterPrev, count, filterItems.length - 1);
        }

        filterBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const dataFilter = e.currentTarget.dataset.filter;

        filterItems.forEach(function (item) {
          if (dataFilter === "all") {
            item.classList.remove("hidden");
            return;
          }

          if (item.classList.contains(dataFilter)) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });

    if (filterPrev && filterNext) {
      filterNext.addEventListener("click", function (e) {
        if (count < filterItems.length - 1) {
          filterItems[count].classList.add("hidden");
          filterBtns[count].classList.remove("active");

          count++;
          filterItems[count].classList.remove("hidden");
          filterBtns[count].classList.add("active");

          hiddenArrow(filterNext, filterPrev, count, filterItems.length - 1);
        }
      });

      filterPrev.addEventListener("click", function (e) {
        if (count > 0) {
          filterItems[count].classList.add("hidden");
          filterBtns[count].classList.remove("active");

          count--;
          filterItems[count].classList.remove("hidden");
          filterBtns[count].classList.add("active");

          hiddenArrow(filterNext, filterPrev, count, filterItems.length - 1);
        }
      });
    }
  });

  function hiddenArrow(next, prev, count, itemsLength) {
    count === itemsLength
      ? next.classList.add("hidden")
      : next.classList.remove("hidden");

    count === 0
      ? prev.classList.add("hidden")
      : prev.classList.remove("hidden");
  }
}

// like-btn
if (document.querySelector(".slider-items__item-like")) {
  const items = document.querySelectorAll(".slider-items__item");
  items.forEach((item) => {
    const btns = item.querySelectorAll(
      ".slider-items__item-like, .slider-items__top-like"
    );
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        btns.forEach((btn) => btn.classList.toggle("active"));
      });
    });
  });
}
