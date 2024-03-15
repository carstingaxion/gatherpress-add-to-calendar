const defaultConfig = require('@wordpress/scripts/config/webpack.config');
module.exports = {
	...defaultConfig,
	entry: {
		'variations/variations':
			'./src/variations.js',
		'add-to-calendar/add-to-calendar':
			'./src/add-to-calendar.js',
	},
};
