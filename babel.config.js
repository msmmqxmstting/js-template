module.exports = (api) => {
	// This caches the Babel config
	api.cache.using(() => process.env.NODE_ENV);
	//	console.log(api.env('development'), 'api env', process.env.NODE_ENV);
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false,
					useBuiltIns: 'usage',
					corejs: 3
				}
			],
			'@babel/preset-react'
		],
		plugins: [
			['@babel/plugin-transform-runtime'],
			[
				'import',
				{
					libraryName: 'antd',
					style: true
				}
			],
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true
				}
			],
			[
				'@babel/plugin-proposal-class-properties',
				{
					loose: true
				}
			],
			'@babel/plugin-transform-modules-commonjs',
			[
				'@babel/plugin-transform-spread',
				{
					loose: true
				}
			],
			['@babel/plugin-proposal-private-methods', { loose: true }],
			['@babel/plugin-proposal-private-property-in-object', { loose: true }],
			api.env('development') && 'react-refresh/babel'
		].filter(Boolean)
	};
};
