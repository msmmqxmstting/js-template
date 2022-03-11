/**
 * Created by xun on  2021/1/12 11:13.
 * description: version 自动根据当前分支更新package.json的version属性值
 */

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const packageJSON = require('../../package.json');

//获取当前所在分支名称
const getGitBranch = () => {
	const info = child_process.execSync('git name-rev --name-only HEAD', { encoding: 'utf8' });
	if (info.includes('.')) {
		const ver = info.replace(/\n+/g, ''),
			verArr = ver.split('.');
		const verStr = verArr.length > 2 ? ver : `${ver}.0`;
		return verStr.replace('V', '');
	}
	return '';
};

function updateVersion(env = 'development') {
	if (env !== 'development') {
		return;
	}
	/** 新的version参数 */
	/** package.json文件的version参数 */
	const version = packageJSON.version,
		newVersion = getGitBranch(),
		regNum = /[0-9]/;
	console.log('原始版本号', version, '新的版本号', newVersion);
	console.log(path.join(__dirname));
	if (newVersion && regNum.test(newVersion) && version !== newVersion) {
		packageJSON.version = newVersion;
		fs.writeFileSync(
			path.join(__dirname, '../../', 'package.json'),
			JSON.stringify(packageJSON, null, 2)
		);
		console.log('--更新【package.json】的version为：%s参数成功--', newVersion);
	} else {
		console.log('---没有改变version；或者不是版本分支---');
	}
	return newVersion;
}
module.exports = { updateVersion, getGitBranch };
