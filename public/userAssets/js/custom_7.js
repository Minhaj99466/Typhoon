 // on ready function
 $(document).ready(function() {
	"use strict";
    // Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(350).fadeOut("slow");
    });
    //---------------- jQuery SlickNav / Onepage Mobile menu-----------//

    $('.mainmenu').slicknav({
        label: '',
        duration: 700,
        easingOpen: "easeOutBounce",
        prependTo: '#mobileMenu',
        closeOnClick: true
    });
	//----------- jQuery MeanMenu / Multipage Mobile menu----------//
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "992",
        meanMenuContainer: ".mobile-menu"
    });
		/*----------------------------
		wow js active
		------------------------------ */
			new WOW().init();
	  	//----------------------- SHOW HIDE LOGIN FORM JS -----------------------//
	
	$('#search_button').on("click", function(e) {
		$('#search_open').slideToggle();
		e.stopPropagation(); 
	});

	$(document).on("click", function(e){
		if(!(e.target.closest('#search_open'))){	
			$("#search_open").slideUp();   		
		}
   });
	 //--------------------up scroll js-----------------------------
							// ===== Scroll to Top ==== 
						$(window).scroll(function() {
							if ($(this).scrollTop() >= 100) {       
								$('#return-to-top').fadeIn(200);   
							} else {
								$('#return-to-top').fadeOut(200);  
							}
						});
						$('#return-to-top').on("click", function() {     
							$('body,html').animate({
								scrollTop : 0                
							}, 500);
						});
			// ===== Scroll to Top end ====  //
   //   sustain slider js start     //
   $('.sustainabilitySlider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
    if (!e.namespace)  {
    return;
    }
    var carousel = e.relatedTarget;
    $('.slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
}).owlCarousel({
    items: 1,
    loop:true,
    margin:0,
    nav:false,
    dotsContainer: '.dots-container',
});
			// Magnific popup-video

            $('.test-popup-link').magnificPopup({ 
                type: 'iframe',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title">Some caption</div>'+
                        '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/', 
                            id: 'v=',
                            src: 'https://www.youtube.com/embed/ryzOXAO0Ss0'
                        }
                    }
                }
                // other options
            });
            
            // history slider js
            $('.historyslider .owl-carousel').owlCarousel({
                loop:true,
                margin:20,
                dots:false,
                nav:false,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            })

            // progess slider range  js
            $(document).ready(function () {
                var owl = $(".historyslider"),
       
                   inputType = $("input[type=range]");
                   owl.owlCarousel({
                   nav: false,
                   dots: false,
                   'responsive': {
                      0: {
                         items: 1,
                         slideBy: 1
       
                      },
                      600: {
                         items: 2,
                         slideBy: 1
       
                      },
                      1280: {
                         items: 5,
                         slideBy: 1
                      }
                   }
                });
       
                owl.on('changed.owl.carousel', function (event) {
                   console.log(event.item.index);
                   inputType.val(event.item.index);
       
                });
                $("input").on("change", function (e) {
                   e.preventDefault();
                   console.log(inputType.val());
       
                   $('.owl-carousel').trigger('to.owl.carousel', [inputType.val(), 1, true]);
                });
             });

// counter  js  start
$('.count').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
  
    {
  
      duration: 3000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
        //alert('finished');
      }
  
    });  
  });

//   gallery js start
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

// client slider js start 

$('.client_slider .owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
autoplay:true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 4,
        nav: false
      },
      1000: {
        items: 6,
        dots: false,
        loop: true,
        margin: 20
      }
    }
  });


//   testimonial slider css
$('.testimonial-slider .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2
        }
    }
})

});