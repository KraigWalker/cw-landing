/*global $ */
'use strict';
$(document).ready(function(){

	// Catch IE < 9 SVG Incompatibility
	// Set the name of the hidden property and the change event for visibility
	var hidden, visibilityChange, active = true;
	if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
		hidden = 'hidden';
		visibilityChange = 'visibilitychange';
	} else if (typeof document.mozHidden !== 'undefined') {
		hidden = 'mozHidden';
		visibilityChange = 'mozvisibilitychange';
	} else if (typeof document.msHidden !== 'undefined') {
		hidden = 'msHidden';
		visibilityChange = 'msvisibilitychange';
	} else if (typeof document.webkitHidden !== 'undefined') {
		hidden = 'webkitHidden';
		visibilityChange = 'webkitvisibilitychange';
	}

	// Microsoft Edge & IE11 Scroll Jank Fix
	// https://connect.microsoft.com/IE/feedback/details/819518/fixed-background-image-scrolling-issue
	if(navigator.userAgent.match(/Edge\/12\./) || navigator.userAgent.match(/Trident\/7\./)) {
		$('body').on('mousewheel', function () {
			event.preventDefault();
			var wd = event.wheelDelta,
			csp = window.pageYOffset;
			window.scrollTo(0, csp - wd);
		});
	}

	$('article').on('click', function() {
		$('html, body').animate({ scrollTop: $('#WeCraftCommunities').offset().top }, 1000 );
	});

	function handleVisibilityChange() {
		if(document[hidden]) {
			active = false;
		} else {
			active = true;
		}
	}

	//  If the browser doesn't support addEventListener or the Page Visibility API
	if (typeof document.addEventListener === 'undefined' || typeof document[hidden] === 'undefined') {
		// just keep animating...
	} else {
	// Handle page visibility change
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
	}

	// select the interchangable spans on the page
	var activeElementIndex, $spanCollection = $('.multi'),
		totalElements = $spanCollection.length;

	activeElementIndex = 0;

	// set Interval
	window.setInterval(function animateTextIfPageVisible() {
		if(active) {

			// check if we need to reset the index to 0
			if (activeElementIndex === (totalElements - 1)) {
				activeElementIndex = 0;
			} else {
				activeElementIndex++;
			}

			// fade out the current  active span
			$('.active').removeClass('active').fadeOut(900, function() {
				// fade in the new active span
				$spanCollection.eq(activeElementIndex).addClass('active').fadeIn(900);
			});
		}
	}, 2400);
});
