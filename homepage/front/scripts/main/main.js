import * as globals from './globals';
import {loadSearch} from './search';

/**
 * Perform search
 * @returns {void}
 */
function search(isTopNav = true) {
	let searchText = encodeURI($('#searchWikiaText').val()),
		searchUrl;

	if (isTopNav) {
		searchText = encodeURI($('#searchWikiaText').val());

		if (!searchText) {
			// search button for mobile is different element
			searchText = encodeURI($('#searchWikiaTextMobile').val());
		}
	} else {
		searchText = encodeURI($('#wiwSearchWikiaTextDesktop').val());

		if (!searchText) {
			// search button for mobile is different element
			searchText = encodeURI($('#wiwSarchWikiaTextMobile').val());
		}
	}

	if (searchText) {
		if (window.optimizely.variationMap[globals.getOptimizelyId()] === 1) {
			// Use Google search
			if (window.location.pathname === '/') {
				searchUrl = `search?q=${searchText}`;
			} else {
				searchUrl = `/search?q=${searchText}`;
			}
		} else {
			// Use Oasis search
			searchUrl = `http://ja.wikia.com/Special:Search?search=${searchText}&fulltext=Search&resultsLang=ja`;
		}

		window.location.href = searchUrl;
	}
}

/**
 * Hides the loading indicator
 * @returns {void}
 */
function hideLoadingIndicator() {
	$('#loading').addClass('loading-done');
	$('.hero-prev').removeClass('hero-hide-arrow');
	$('.hero-next').removeClass('hero-hide-arrow');
}

$(() => {
	let delta;

	// Hide loading indicator after load complete
	$(window).load(() => {
		hideLoadingIndicator();
	});

	// Or after 6 seconds
	setTimeout(() => {
		hideLoadingIndicator();
	}, 6000);

	$('.hero-carousel').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					dots: false
				}
			}
		]
	});

	$('.hero-carousel-mobile').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
	});

	// Move previous/next arrow elements inside hero-carousel.
	// This must be done after initializing slick, otherwise the buttons will
	// be treated as slides
	$('#hero-prev').detach().appendTo('#hero-carousel');
	$('#hero-next').detach().appendTo('#hero-carousel');
	$('#hero-prev-mobile').detach().appendTo('#hero-carousel-mobile');
	$('#hero-next-mobile').detach().appendTo('#hero-carousel-mobile');

	$('.featured-carousel').slick({
		arrows: false,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1140,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 865,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 615,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Compensation for responsive spacing between slides. See INT-319 and INT-329
	// 250 is the fixed pixel width of each slide
	delta = $('#carousel-1 .slick-slide').width() - 250;

	for (let i = 1; i <= 5; i++) {
		$(`#carousel-${i}-prev`).detach().appendTo(`#carousel-${i}`);
		$(`#carousel-${i}-next`).detach().appendTo(`#carousel-${i}`);

		// Set padding for left and right arrow
		// 10px left padding, and 10px + slide spacing compensation on right
		$(`#carousel-${i}-prev`).addClass('hero-prev-category');
		$(`#carousel-${i}-next`).css('right', delta + 10);
	}

	if (delta > 0) {
		// Compensation for slide not being fully centered due to responsive slider spacing
		$('.featured').css('padding-left', 54 + delta);
	}

	globals.loadGlobalData().then((data) => {
		loadSearch(data.mobileBreakpoint);
	});
});

$('#beginnersGuide').click((event) => {
	window.location.href = '/beginners';
	event.preventDefault();
});

$('.search-wikia-form').submit((event) => {
	search();
	event.preventDefault();
});

$('.search-wikia').click((event) => {
	search();
	event.preventDefault();
});

$('.jw-community-link').click(() => {
	window.location.href = globals.getJaCommunityUrl();
});

$('.jw-university-link').click(() => {
	window.location.href = globals.getJaUniversityUrl();
});

$('.wiw-search-wikia-form').submit((event) => {
	search(false);
	event.preventDefault();
});

$('.wiw-search-wikia-button').click((event) => {
	search(false);
	event.preventDefault();
});

$('.wiw-start-wikia').click(() => {
	window.location.href = globals.getStartWikiaUrl();
});

$('.hero-prev').click(function () {
	const id = $(this).attr('id'),
		carousel = $(`#${id}`).parent().attr('id');

	$(`#${carousel}`).slick('slickPrev');
});

$('.hero-next').click(function () {
	const id = $(this).attr('id'),
		carousel = $(`#${id}`).parent().attr('id');

	$(`#${carousel}`).slick('slickNext');
});

$('#loginIcon').click((event) => {
	if ($(document).width() < globals.getMobileBreakpoint()) {
		$('#userInfoToggle').toggle();
	} else {
		window.location.href = globals.getLoginUrl();
	}

	event.preventDefault();
});
