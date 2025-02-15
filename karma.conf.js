const puppeteer = require('puppeteer');

process.env.TEST = true;
process.env.NODE_ENV = 'test';
process.env.CHROME_BIN = puppeteer.executablePath();

const webpackConfig = require('./webpack.config.js')({ production: false, karma: true });

delete webpackConfig.entry;

module.exports = (config) => {
	'use strict';

	var configuration = {
		client: {
			mocha: {
				timeout: 5000,
			},
		},
		basePath: '',
		frameworks: ['mocha', 'sinon-chai', 'es6-shim'],
		files: [
			{ pattern: './test/index.ts', include: true },
			{ pattern: '**/*.map', served: true, included: false, watched: true },
		],
		preprocessors: {
			'./test/index.ts': ['webpack'],
			'./**/**/**/**.ts': ['sourcemap'],
		},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true,
		},
		plugins: [
			'karma-webpack',
			'karma-sourcemap-writer',
			'karma-sourcemap-loader',
			'karma-mocha-reporter',
			'karma-mocha',
			'karma-sinon-chai',
			'karma-es6-shim',
		],
		mime: {
			'text/x-typescript': ['ts', 'tsx'],
		},
		reporters: config.singleRun ? ['dots', 'mocha'] : ['dots', 'mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_DEBUG,
		autoWatch: true,
		concurrency: Infinity,
		browsers: [],
		browserNoActivityTimeout: 50000,
	};

	configuration.browsers.push('ChromeHeadless');
	configuration.plugins.push('karma-chrome-launcher');

	config.set(configuration);
};
