/**
 * Created by xun on  2021/9/5 15:41.
 * description: webpack-open-browser-plugin
 * webpack devServer 开发服务器有打开浏览器的功能，但是体验很差，在webpack还没编译完成，浏览器已经打开了，
 * 显示一个空白的加载页面，要等很久，而且启动开发时，我们在看编译的log输出，打开浏览器突然打断了log输出，
 * 显示到眼前的却是一个加载页面，体验非常糟糕, 而且经常不生效。
 这个插件会在webpack编译完成，才打开浏览器，因为编译完成了，你能直接看到网页内容，而不是空白的加载页面。
 更好的体验：不会打断编译log输出、不会看到烦人的空白加载页面。但devServer的open选项需要禁用
 */
function WebpackOpenBrowserPlugin(options) {
	this.options = options || {};
}

function once(fn) {
	let called = false;
	return function () {
		if (called) return;
		called = true;
		fn();
	};
}

WebpackOpenBrowserPlugin.prototype.apply = function (compiler) {
	const t = this;
	// Open the browser should be once
	compiler.hooks.done.tap(
		'WebpackOpenBrowserPlugin',
		once(function () {
			const url = t.options.url;
			if (!url) {
				console.error(
					'请配置URL,如: new WebpackOpenBrowserPlugin({ url: "http://localhost:8080" })'
				);
				return;
			}
			console.log(`编译完成，在浏览器打开${url}`);
			// setTimeout delay is used because there is no need to make webpack wait for the browser to open
			setTimeout(function () {
				const open = require('opn');
				open(url).then();
			});
		})
	);
};

module.exports = WebpackOpenBrowserPlugin;
