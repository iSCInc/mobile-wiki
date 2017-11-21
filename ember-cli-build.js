const EmberApp = require('ember-cli/lib/broccoli/ember-app'),
	Funnel = require('broccoli-funnel'),
	stew = require('broccoli-stew');

/**
 * We override Ember's private method to remove files from the final build
 * which are added by addons but not used by us
 *
 * HEADS UP!
 * If you update ember-cli and something breaks,
 * the first thing you should try is to comment this out
 */
EmberApp.prototype.addonTreesFor = function (type) {
	return this.project.addons.map((addon) => {
		if (addon.treeFor) {
			let tree = addon.treeFor(type);

			if (tree) {
				// uncomment to see the files available to be filtered out
				// tree = stew.log(tree, {output: 'tree'});
				tree = stew.rm(
					tree,
					'modules/ember-types/asserts/**/*.js',
					'modules/ember-types/constants/*.js',
					'modules/ember-types/property/*.js'
				);
			}

			return tree;
		}
	}).filter(Boolean);
};

module.exports = function (defaults) {
	const inlineScriptsPath = 'app/inline-scripts/';
	const app = new EmberApp(defaults, {
		autoprefixer: {
			cascade: false,
			map: false
		},
		derequire: {
			patterns: [
				{
					from: 'define',
					to: 'mefine'
				},
				{
					from: 'require',
					to: 'mequire'
				}
			]
		},
		fingerprint: {
			extensions: ['js', 'css', 'svg', 'png', 'jpg', 'gif', 'map'],
			replaceExtensions: ['html', 'css', 'js', 'hbs'],
			prepend: 'https://mobile-wiki.nocookie.net/'
		},
		inlineContent: {
			'fastboot-inline-scripts-body-bottom': `node_modules/mercury-shared/dist/body-bottom.js`,
			'fastboot-inline-scripts-head': `node_modules/mercury-shared/dist/head.js`,
			'fastboot-inline-scripts-head-tracking': `node_modules/mercury-shared/dist/head-tracking.js`,
			'fastboot-inline-scripts-load-svg': `node_modules/mercury-shared/dist/load-svg.js`,
			'measure-first-render': `${inlineScriptsPath}measure-first-render.html`,
			'tracking-internal': `${inlineScriptsPath}tracking-internal.js`,
			'tracking-liftigniter': `${inlineScriptsPath}tracking-liftigniter.js`,
			'tracking-nielsen': `${inlineScriptsPath}tracking-nielsen.js`,
			'tracking-netzathleten': `${inlineScriptsPath}tracking-netzathleten.js`,
			'tracking-ua': `${inlineScriptsPath}tracking-ua.js`,
			'script-loader': `bower_components/script.js/dist/script.min.js`,
			'inline-ads': `${inlineScriptsPath}ads.js`,
			'inline-ads-loader': `${inlineScriptsPath}ads-loader.js`,
		},
		outputPaths: {
			app: {
				css: {
					app: '/assets/app.css',
				},
				html: 'index.html',
			}
		},
		sassOptions: {
			includePaths: [
				'bower_components/wikia-style-guide/src/scss',
				'bower_components/design-system/dist/scss'
			],
			onlyIncluded: true
		},
		svgstore: {
			files: [
				{
					sourceDirs: 'app/symbols/main',
					outputFile: '/assets/main.svg'
				},
			]
		},
		eslint: {
			testGenerator: 'qunit',
			group: true,
			rulesDir: '.',
			extensions: ['js'],
		}
	});

	const designSystemAssets = new Funnel(`${app.bowerDirectory}/design-system/dist/svg/sprite.svg`, {
		destDir: 'assets/design-system.svg'
	});

	// Assets which are lazy loaded
	const designSystemI18n = new Funnel('node_modules/design-system-i18n/i18n', {
			destDir: 'locales'
		}),
		jwPlayerAssets = new Funnel('node_modules/jwplayer-fandom/dist', {
			destDir: 'assets/jwplayer'
		});

	return app.toTree([
		designSystemI18n,
		designSystemAssets,
		jwPlayerAssets
	]);
};
