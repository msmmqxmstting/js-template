/**
 * Created By xun  on 2018-10-08 14:28.
 * Description: index
 */
const path = require('path');
const wpConstants = require('../conf/index.js');
const os = require('os');
const pkg = require('../../package.json');
//创建别名,
const createAlias = () => {
	const alias = wpConstants.ALIAS_CONFIG;
	const obj = {
		root: path.join(__dirname, '../../src'),
		react: path.join(__dirname, '../../node_modules/react'),
		'lodash-es': path.join(__dirname, '../../node_modules/lodash')
	};
	alias.forEach((item) => {
		obj[item] = path.join(__dirname, `../../src/${item}`);
	});
	return obj;
};
const WP_ALIAS = {
	root: path.join(__dirname, '../../src'),
	react: path.join(__dirname, '../../node_modules/react'),
	pages: path.join(__dirname, '../../src/pages'),
	constants: path.join(__dirname, '../../src/constants'),
	components: path.join(__dirname, '../../src/components'),
	stores: path.join(__dirname, '../../src/stores'),
	services: path.join(__dirname, '../../src/services'),
	utils: path.join(__dirname, '../../src/utils'),
	assets: path.join(__dirname, '../../src/assets'),
	static: path.join(__dirname, '../../src/static'),
	styles: path.join(__dirname, '../../src/styles'),
	routers: path.join(__dirname, '../../src/routers'),
	db: path.join(__dirname, '../../src/db')
};
//创建缓存路径,区分运行环境
const initCacheDirectory = (moduleName) => {
	const isWindows = os.platform().includes('win'),
		env = process.env.NODE_ENV || 'dev',
		envDir = isWindows ? env.replace(':', '-') : env;
	return `${os.homedir()}/.cache/${pkg.name}/${moduleName}/${envDir}`;
};
module.exports = { WP_ALIAS, createAlias, initCacheDirectory };
