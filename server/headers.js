const onHeaders = require('on-headers');

function setResponseTime(res) {
	const startAt = process.hrtime();

	onHeaders(res, () => {
		const diff = process.hrtime(startAt);
		const timeSec = (diff[0] * 1e3 + diff[1] * 1e-6) / 1000;

		res.setHeader('x-backend-response-time', timeSec.toFixed(3));
	});
}

module.exports = function (req, res, next) {
	res.set('x-served-by', process.env.HOST || process.env.HOSTNAME || 'mobile-wiki');
	setResponseTime(res);
	next();
};
