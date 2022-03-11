/**
 * Created By xun  on 2018-12-13 15:13.
 * Description: loaders 各种加载器规则、插件，非特殊说明，都是通用配置
 */
const path = require('path');

const { themes } = require('./themes');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { jsWorkerPool, cssWorkerPool } = require('./threadLoader');
const DEV_ENV = process.env.NODE_ENV === 'development';
const { initCacheDirectory } = require('./index');
//统一的js文件的thread-loader
const JSThreadLoader = {
	loader: 'thread-loader',
	options: jsWorkerPool
};
//统一的css文件的thread-loader
const CSSThreadLoader = {
	loader: 'thread-loader',
	options: cssWorkerPool
};
//babel-loader
const JSLoaders = [
	JSThreadLoader,
	{
		loader: 'babel-loader',
		options: {
			cacheDirectory: initCacheDirectory('babel-loader'),
			cacheCompression: false,
			include: [path.resolve(__dirname, '../src')],
			compact: !DEV_ENV
		}
	}
];

//less文件的loader
const LessLoaders = [
	'style-loader',
	CSSThreadLoader,
	{ loader: 'css-loader', options: { importLoaders: 2 } },
	'postcss-loader',
	{
		loader: 'less-loader',
		options: {
			sourceMap: !DEV_ENV,
			modifyVars: themes,
			javascriptEnabled: true,
			paths: [path.resolve(__dirname, '../node_modules')]
		}
	}
];

//image loader
const ImageLoaders = [
	{
		loader: 'url-loader',
		options: {
			limit: 8192,
			name: 'assets/img/[contenthash].[name].[ext]'
		}
	}
];

// 字体的 loader
const FontLoaders = [
	{
		loader: 'url-loader',
		options: {
			limit: 8192,
			name: 'assets/fonts/[contenthash].[name].[ext]'
		}
	}
];

/*、*
 * 生产环境的 css 加载
 * */
const ProdCSSLoaders = [
	MiniCssExtractPlugin.loader,
	CSSThreadLoader,
	{
		loader: 'css-loader',
		options: {
			importLoaders: 1,
			sourceMap: true
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			config: {
				path: path.resolve(__dirname, '../../postcss.config.js')
			}
		}
	}
];

module.exports = {
	JSLoaders,
	LessLoaders,
	ProdCSSLoaders
};
