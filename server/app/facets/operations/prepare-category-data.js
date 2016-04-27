import {parseQueryParams} from '../../lib/utils';
import {getDefaultTitle, getBaseResult, getOpenGraphData} from './page-data-helper';
import {namespace} from '../../lib/mediawiki-namespace';

/**
 * @param {Hapi.Request} request
 * @param {MediaWikiPageData} data
 * @returns {object}
 */
export default function prepareCategoryData(request, data) {
	const allowedQueryParams = ['noexternals', 'buckysampling'],
		pageData = data.page.data,
		prefix = `${data.wikiVariables.namespaces[namespace.CATEGORY]}:`,
		separator = data.wikiVariables.htmlTitle.separator,
		result = getBaseResult(request, data);

	result.displayTitle = getDefaultTitle(request, pageData);

	/**
	 * This is necessary to avoid having duplicated title on Category pages without displayTitle
	 * This should be removed in XW-1442
	 */
	if (result.displayTitle.indexOf(prefix) === 0) {
		result.displayTitle = result.displayTitle.substring(prefix.length);
	}

	result.documentTitle = prefix + result.displayTitle + separator + result.documentTitle;
	result.hasToC = false;
	result.queryParams = parseQueryParams(request.query, allowedQueryParams);
	result.subtitle = request.server.methods.i18n.getInstance().t('app.category-page-subtitle');

	if (pageData && pageData.details) {
		result.canonicalUrl += pageData.details.url;
		result.description = pageData.details.description;
	}

	if (typeof request.query.buckySampling !== 'undefined') {
		result.localSettings.weppy.samplingRate = parseInt(request.query.buckySampling, 10) / 100;
	}

	result.openGraph = getOpenGraphData('category', result.displayTitle, result.canonicalUrl);

	return result;
}
