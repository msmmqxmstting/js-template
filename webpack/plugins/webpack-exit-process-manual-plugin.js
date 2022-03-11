/**
 * Created by xun on  2021/9/5 15:48.
 * description: webpack-exit-process-manual-plugin
 *  webpack有时build之后不好自动退出进程，监听hooks，重写退出进程的插件
 */
function WebpackExitProcessManualPlugin() {}

WebpackExitProcessManualPlugin.prototype.apply = function (compiler) {
	if (compiler.hooks) {
		compiler.hooks.done.tap('WebpackExitProcessManualPlugin', (stats) => {
			console.log('退出进程');
			setTimeout(() => {
				process.exit(0);
			});
		});
	} else {
		compiler.plugin('done', (stats) => {
			console.log('已退出编译进程');

			setTimeout(() => {
				process.exit(0);
			});
		});
	}
};
module.exports = WebpackExitProcessManualPlugin;
