/*
 * Path list for tasks
 */

var environment = require('./util/environment'),
	path = require('path'),
	basePaths = {
		dev: '.tmp',
		production: 'www'
	},
	basePath = basePaths[environment.name];

if (!basePath) {
	console.log('Paths for a given environment (' + environment + ') not found');
	process.exit(1);
}

module.exports = {
	base: basePath,
	baseFull: path.resolve(basePath),
	components: {
		in: 'public/components/',
		out: basePath + '/public/components'
	},
	styles: {
		main: 'public/styles/app.scss',
		aboveTheFold: 'public/styles/aboveTheFold.scss',
		watch: 'public/styles/**/*.scss',
		out: basePath + '/public/styles'
	},
	scripts: {
		front: {
			in: 'public/scripts/**/*.ts',
			out: basePath + '/public/scripts'
		},
		back: {
			in: 'server/**/*.ts',
			out: basePath
		}
	},
	views: {
		in: 'views/**/*',
		out: basePath + '/views'
	},
	templates: {
		in: 'public/templates/**/*.hbs',
		out: basePath + '/public/templates'
	},
	svg: {
		in: 'public/svg/*.svg',
		out: basePath + '/public/svg'
	},
	nodemon: {
		script: basePath + '/server/app.js',
		watch: [
			basePath + '/server',
			basePath + '/views'
		]
	}
};
