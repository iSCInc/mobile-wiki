import { helper } from '@ember/component/helper';

/**
 * Helper to convert unix timestamp to date
 * {{timestamp-to-date unixTimestamp}}
 *
 * @param {int} unixTimestamp
 * @returns {string}
 */
export default helper(unixTimestamp => new Date(unixTimestamp * 1000).toLocaleDateString());
