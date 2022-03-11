/**
 * Created by xun on  2020/12/25 10:39.
 * description: theme
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const lessToJs = require('less-vars-to-js');

const THEME_FILE = path.join(__dirname, '../../src/themes/base.less');
//转换 less 变量,用于主题
const themes = lessToJs(fs.readFileSync(THEME_FILE, 'utf8'));

//计算主题文件的hash，用于webpack5的缓存生效
const calcThemesHash = () => {
	const buffer = fs.readFileSync(THEME_FILE);
	const hash = crypto.createHash('md5');
	hash.update(buffer, 'utf8');
	const md5 = hash.digest('hex');
	return md5;
};
module.exports = { themes, calcThemesHash };
