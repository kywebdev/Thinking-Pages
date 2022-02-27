$(document).ready(function() {

    // back to top smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': 0 + $target.offset().top
        }, 900, 'swing', function() {});
    });

    // color column size
    function colorColSize(width) {
        if (width <= 1185) {
            var colHeight = $('.closer-look-points__img').height() - 50;
			$('.theres-more .color-col').css({
				'height': colHeight,
				'top': -colHeight
			});
        } else {
			var colHeight = $('.closer-look-points .row').height() - 50;
			$('.theres-more .color-col').css({
				'height': colHeight,
				'top': -colHeight
			});
			var colHeight2 = $('.closer-look-points .elementor-container').height() - 50;
			$('.theres-more .color-col').css({
				'height': colHeight2,
				'top': -colHeight2
			});
        }
    }
    colorColSize( $(window).width() );
    $(window).on('resize', function() {
        colorColSize( $(this).width() );
    });

	// work slider
	$('.work-section__slider').slick({
		dots: true,
		infinite: true,
		adaptiveHeight: true,
		touchThreshold: 100
	});

	// agency buttons
	$('.agency-buttons button').on('click', function() {
		$(this).addClass('open');
		$('body').addClass('show-modal');
		var agency = $(this).data('agency');
		var showAgency = $('.agency-overlays .overlay[data-agency="' + agency + '"]');
		showAgency.addClass('show');
	});

	// close the agency overlay
	$('.close-overlay').on('click', function() {
		$('.agency-buttons button.open').addClass('is-closing');
		$('.agency-buttons button').removeClass('open');
		$('body').removeClass('show-modal');
		$('body').addClass('overlay-closing');
		setTimeout(function() {
			$('.agency-overlays .overlay').removeClass('show');
			$('body').removeClass('overlay-closing');
			$('.agency-buttons button').removeClass('is-closing');
		}, 1000);
	});

	// show modals on load
	$('.modal').modal('show');

	// keep the page scrolled to the about section when the modal window is resized
	function scrollOverlay(width) {
        if (width > 0) {
            if ($('.agency-overlays .overlay').hasClass('show')) {
				var target = '#about';
				var $target = $(target);
		
				$('html, body').stop().animate({
					'scrollTop': 0 + $target.offset().top
				}, 900, 'swing', function() {});
			}
		}
    }
    scrollOverlay( $(window).width() );
    $(window).on('resize', function() {
        scrollOverlay( $(this).width() );
    });

	// toggle the mobile menu
	$('.mobile-menu').on('click', function() {
		$('header').toggleClass('open closed').removeClass('hide-nav');
		$('body').removeClass('resize-animation-stopper');
	});

	// close the mobile nav when an anchor link is clicked
	$('header nav ul li a').on('click', function() {
		$('header').toggleClass('open closed');
	});

	// stop the mobile nav animation when the screen is resized
	window.addEventListener('resize', () => {
		document.body.classList.add('resize-animation-stopper');
		$('header').addClass('closed').removeClass('open');
	});

});