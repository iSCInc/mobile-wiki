import {PageRequest} from '../../lib/mediawiki';
import {getCachedWikiDomainName} from '../../lib/utils';
import localSettings from '../../../config/localSettings';
import getStatusCode from '../operations/get-status-code';

/**
 * @param {Hapi.Request} request
 * @param {*} reply
 * @returns {void}
 */
export default function get(request, reply) {
	const params = {
		wikiDomain: getCachedWikiDomainName(localSettings, request),
		categoryName: decodeURIComponent(request.params.categoryName),
		thumbSize: request.params.thumbSize || {
			width: 300,
			height: 300
		},
		offset: request.query.offset || ''
	};

	new PageRequest(params)
		.category(params.categoryName, params.thumbSize, params.offset)
		.then(reply)
		/**
		 * @param {*} error
		 * @returns {void}
		 */
		.catch((error) => {
			reply(error).code(getStatusCode(error));
		});
}