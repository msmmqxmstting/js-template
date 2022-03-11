/**
 * Created by xun on  2020/10/27 17:00.
 * description: rules
 */ const path = require('path');

const loaderCreator = require('./loaders.js');
// 通用的加载规则
const rules = [
	{
		test: /\.js$/,
		use: loaderCreator.JSLoaders,
		include: path.join(__dirname, '../../src') //注意路径
	},
	{
		test: /\.(jpe?g|png|pdf|svg|gif|ico)$/,
		type: 'asset'
	},

	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		type: 'asset/inline'
		//	use: loaderCreator.FontLoaders
	},
	{
		test: /\.less$/,
		use: loaderCreator.LessLoaders
	},
	{
		test: /\.m?js/,
		resolve: {
			fullySpecified: false
		}
	}
];
module.exports = rules;
