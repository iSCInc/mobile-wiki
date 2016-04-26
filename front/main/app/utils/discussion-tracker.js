import {track as mercuryTrack} from 'common/utils/track';

const trackActions = {
	PostCreate: 'PostCreate',
	PostEdit: 'PostEdit',
	ReplyCreate: 'ReplyCreate',
	ReplyEdit: 'ReplyEdit',
	UndoUpvotePost: 'UndoUpvotePost',
	UpvotePost: 'UpvotePost',
	LatestPostTapped: 'LatestPostTapped',
	TrendingPostTapped: 'TrendingPostTapped',
	PostShare: 'PostShare',
	PostClose: 'PostClose',
	ReplyClose: 'ReplyClose',
	PostStart: 'PostStart',
	ReplyStart: 'ReplyStart',
	PostContent: 'PostContent',
	AnonUpvotePost: 'AnonUpvotePost',
	ReplyContent: 'ReplyContent',
	MorePostActions: 'MorePostActions',
	Report: 'Report',
	PostLock: 'PostLock',
	PostUnlock: 'PostUnlock',
	DeleteAllConfirmed: 'DeleteAllConfirmed',
	DeleteAllTapped: 'DeleteAllTapped',
};

/**
 * Currently we change mobile to desktop layout
 *
 * @returns {string}
 */
function getGACategory() {
	return window.innerWidth < 1064 ? 'MobileWebDiscussions' : 'DesktopWebDiscussions';
}

/**
 * @param {string} action
 *
 * @returns {object}
 */
function getGAContext(action) {
	return {
		action,
		category: getGACategory(),
		label: window.location.origin
	};
}

/**
 * @param {string} action
 *
 * @returns {void}
 */
export function track(action) {
	mercuryTrack(
		getGAContext(action)
	);
}

/**
 * @param {string} network
 *
 * @returns {string}
 */
export function getTrackActionForShareNetwork(network) {
	return `${network}-ShareButtonTapped`;
}

export {trackActions};
