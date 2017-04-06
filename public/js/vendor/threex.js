var Threex = Threex || {};
Threex.Fullscreen = Threex.Fullscreen || {};

Threex.Fullscreen = function(key) {
	document.addEventListener('keypress', fullscreen, false);

	function fullscreen(event) {
		var x;

		if (window.event) {
			x = event.keyCode;
		} else if (event.which) {
			x = event.which;
		}

		if (String.fromCharCode(x) === key.toLowerCase()) {
			var elem = document.body;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			}
		}
	}
};