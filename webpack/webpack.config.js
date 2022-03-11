/**
 * @author Moxx
 * @date 公共webpack配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEV_ENV = process.env.NODE_ENV === 'development';
const wpUtils = require('./utils/index.js');
const webpack = require('webpack');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const { themes, calcThemesHash } = require('./utils/themes');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const rules = require('./utils/rules');
const { getGitBranch, updateVersion } = require('./utils/version');
const { initCacheDirectory } = require('./utils');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const latestVer = updateVersion(process.env.NODE_ENV);

console.log('当前运行环境', process.env.NODE_ENV);
//公共配置
const webpackConfig = {
	entry: {
		app: [path.join(__dirname, '../src/index.js')]
	},
	output: {
		path: path.join(__dirname, '../dist'),
		/*这里本来应该是[chunkhash]的，但[chunkhash]和react-refresh不兼容。*/
		//	filename: `[name].[${DEV_ENV ? 'full' : 'chunk'}hash:8].js`,
		filename: '[name].[contenthash].js',
		chunkFilename: 'js/[name].[contenthash].js',
		publicPath: '/'
	},
	cache: {
		type: 'filesystem',
		cacheDirectory: initCacheDirectory('webpack'),
		version: latestVer + calcThemesHash() //解决缓存捯饬主题色不生效
	},
	module: {
		rules,
		//如果使用@ant-design/charts 1.x版本， 不能加入 /lodash\.js$/ 规则，否则https://github.com/ant-design/ant-design-charts/issues/306
		noParse: [/react\.min\.js$/]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '和信保理-react应用脚手架',
			filename: 'index.html',
			favicon: path.join(__dirname, '../src/assets/favicon.ico'),
			template: path.join(__dirname, '../src/index.html'),
			chunksSortMode: 'none', //否则出现错误
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),
		new AntdDayjsWebpackPlugin(), //使用dayjs替代moment
		new webpack.DefinePlugin({
			'process.themes': JSON.stringify(themes),
			'process.env': {
				APP_VERSION: JSON.stringify(getGitBranch()),
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new SimpleProgressWebpackPlugin(),
		/*若使用了 PDFView  必须做 copy 操作*/
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'node_modules/hx-pdfjs-dist/',
					to: 'hx-pdfjs-dist/'
				}
			]
		})
	],

	resolve: {
		alias: wpUtils.WP_ALIAS, //引用时需要精确引用，默认 index 暂时失效。如：import utils from 'utils/index'
		modules: [path.join(__dirname, '../src'), 'node_modules'],
		extensions: ['.js', '.jsx']
	},
	performance: {
		hints: 'warning',
		//入口起点的最大体积
		maxEntrypointSize: 10000000,
		//生成文件的最大体积
		maxAssetSize: 30000000,
		// maxAssetSize: 1024 * 1024 * 3,
		//只给出 js 文件的性能提示
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.js');
		}
	}
};

module.exports = webpackConfig;
