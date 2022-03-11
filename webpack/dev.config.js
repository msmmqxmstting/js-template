const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.config.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//const portfinder = require('portfinder'); // 自动检索下一个可用端口
const OpenBrowserPlugin = require('./plugins/webpack-open-browser-plugin');
const devServer = require('./dev.server');
const path = require('path');
const devConfig = {
	output: { pathinfo: false },
	devtool: 'eval-cheap-module-source-map',
	target: 'web', // webpack5.x 加上之后热更新才有效果
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			}
		]
	},
	devServer,
	plugins: [
		new ReactRefreshWebpackPlugin({ overlay: false }),
		new OpenBrowserPlugin({ url: `http://localhost:${process.env.PORT || devServer.port}` })
	]
};
const devWebpackConfig = merge(commonConfig, devConfig);
module.exports = devWebpackConfig;
/*
module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || devServer.port; // 获取当前设定的端口
	portfinder.getPort((err, port) => {
		if (err) {
			console.log(err);
			reject(err);
		} else {
			process.env.PORT = port; // process 公布端口
			devWebpackConfig.devServer.port = port; // 设置 devServer 端口

			resolve(devWebpackConfig);
		}
	});
});
*/
