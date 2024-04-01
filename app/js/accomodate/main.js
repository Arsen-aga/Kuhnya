//= ../libs/slick.min.js
//= ../libs/fancybox.umd.js

$(".services__slider").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
});

if($(".reviews__slider")){
  $(".reviews__slider").slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 421,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
      },
    },
  ],
});
}


if ($(".questions__item")) {
  $(".questions__item").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".questions__item").removeClass("active");
      $(this).addClass("active");
    }
  });
}

Fancybox.bind("[data-fancybox]", {});
