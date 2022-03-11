/**
 postcss.webpack.build.config.javascript
 * Created by xun on 2017/9/21.
 */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		postcssPresetEnv({
			stage: 0
		})
	]
};
