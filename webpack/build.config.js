const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ExitProcessManualPlugin = require('./plugins/webpack-exit-process-manual-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const commonConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dllUtils = require('./utils/dll.js');
const WPLoaders = require('./utils/loaders.js');

//生产环境的配置
const buildConfig = {
	devtool: false,
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: WPLoaders.ProdCSSLoaders
			}
		]
	},
	optimization: {
		runtimeChunk: true,
		minimize: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 3000000,
			minChunks: Infinity,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true
				},
				styles: {
					//	name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		},
		minimizer: [
			'...',
			new TerserPlugin({
				parallel: true,
				//				cache: initCacheDirectory('terserPlugin'),
				terserOptions: {
					//ecma: 7,
					warnings: false,
					compress: {
						drop_console: true,
						collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
						reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
					}
				}
			}),
			// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
			new CssMinimizerPlugin() // use OptimizeCSSAssetsPlugin
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].[contenthash].css'
		}),
		dllUtils.copyDllToAssets(),
		...dllUtils.createDllReferences(),
		dllUtils.addDllHtmlPath(),
		new FriendlyErrorsWebpackPlugin(),
		new ExitProcessManualPlugin()
	],
	stats: 'errors-only'
};

if (process.env.NODE_ENV === 'production:analyze') {
	buildConfig.plugins.push(new BundleAnalyzerPlugin()); //仅在分析时启用
}
module.exports = merge(commonConfig, buildConfig);
