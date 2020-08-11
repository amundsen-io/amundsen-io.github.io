$(document).ready(function(){
    $(".slick").slick({
     dots: true,
     accessibility: true,
     arrows: true,
     slidesToShow: 4,
     slidesToScroll: 4,
     autoplay: true,
     autoplaySpeed: 2500,
     responsive: [
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 4,
           slidesToScroll: 4,
         }
       },
       {
         breakpoint: 600,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 2
         }
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }
     ]
    });
});
