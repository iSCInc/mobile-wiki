(function () {
	var gettersQueue = [];
	var isListening = false;

	window.onInstantGlobalsLoaded = function () {
		window.document.dispatchEvent(new Event('instantGlobalsLoaded'));
	};

	window.onInstantGlobalsError = function () {
		window.Wikia = window.Wikia || {};
		window.Wikia.InstantGlobals = {};
		window.document.dispatchEvent(new Event('instantGlobalsLoaded'));
	};

	window.getInstantGlobal = function (key, callback) {
		function onInstantGlobalsLoaded() {
			gettersQueue.forEach(function (getter) {
				getter.callback(window.Wikia.InstantGlobals[getter.key]);
			});

			gettersQueue = [];
		}

		if (window.Wikia && window.Wikia.InstantGlobals) {
			callback(window.Wikia.InstantGlobals[key]);
		} else {
			gettersQueue.push({key: key, callback: callback});

			if (!isListening) {
				document.addEventListener('instantGlobalsLoaded', onInstantGlobalsLoaded, {once: true});
				isListening = true;
			}
		}
	};

	window.waitForInstantGlobals = function (callback) {
		return window.getInstantGlobal('', callback);
	};
})();
