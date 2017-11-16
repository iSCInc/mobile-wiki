(function() {
	var wikiVariables = M.getFromShoebox('wikiVariables'),
		cdnRootUrl = wikiVariables.cdnRootUrl,
		cacheBuster = wikiVariables.cacheBuster,
		adsUrl = cdnRootUrl + '/__am/' + cacheBuster + '/groups/-/mercury_ads_js',
		Ads = Mercury.Modules.Ads.getInstance(),
		JWPlayerVideoAds = Mercury.Modules.JWPlayerVideoAds;

	Ads.init(adsUrl);
	debugger;
	window.Mercury.Modules.Ads.initialized = true;
	window.Mercury.Modules.Ads.currentAdsContext = M.getFromShoebox('adsContext');

	function createPlayer() {
		Ads.waitForReady()
			.then(() => (new JWPlayerVideoAds({noAds: false})).getConfig())
			.then(initializePlayer)
			.catch(function (err) {debugger;})
	}

	function initializePlayer() {
		debugger;
	}

	createPlayer();
})();
