/**
 * @class MainPageDataRequestError
 * @param {*} data
 */
export class MainPageDataRequestError {
	/**
	 * @param {*} data
	 * @returns {void}
	 */
	constructor(data) {
		Error.apply(this, arguments);
		this.data = data;
	}
}

MainPageDataRequestError.prototype = Object.create(Error.prototype);

/**
 * @class PageRequestError
 * @param {*} data
 */
export class PageRequestError {
	/**
	 * @param {MediaWikiPageData} data
	 * @returns {void}
	 */
	constructor(data) {
		Error.apply(this, arguments);
		this.data = data;
	}
}

PageRequestError.prototype = Object.create(Error.prototype);

/**
 * @class RedirectedToCanonicalHost
 */
export class RedirectedToCanonicalHost {
	/**
	 * @returns {void}
	 */
	constructor() {
		Error.apply(this, arguments);
	}
}

RedirectedToCanonicalHost.prototype = Object.create(Error.prototype);

/**
 * @class WikiVariablesRequestError
 */
export class WikiVariablesRequestError {
	/**
	 * @returns {void}
	 */
	constructor() {
		Error.apply(this, arguments);
	}
}

WikiVariablesRequestError.prototype = Object.create(Error.prototype);

/**
 * @class WikiVariablesNotValidWikiError
 */
export class WikiVariablesNotValidWikiError {
	/**
	 * @returns {void}
	 */
	constructor() {
		Error.apply(this, arguments);
	}
}

WikiVariablesNotValidWikiError.prototype = Object.create(Error.prototype);
