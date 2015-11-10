/**
 * This module is an alias for whatever script loader implementation we are using.
 * Use this stub to normalize/expose the features available to Wikia
 * developers and also to allow for swapping implementations in the future.
 */

/**
 * @param {*[]} params
 * @returns {*}
 */
export function load(...params) {
	return $script.apply(null, params);
}
