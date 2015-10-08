/*global Modernizr, $*/

if (!Modernizr.svg) {
	var logos = document.getElementsByClassName("cw-logo");
	Array.prototype.forEach.call(logos, function(el) {
		el.attr("src", 'cw-logo.png');
	});
}