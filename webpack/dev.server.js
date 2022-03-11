/**
 * Created by xun on  2020/9/14 10:29.
 description: dev.server
 */
const path = require('path');
const PROXY_CONF = {
	secure: false,
	changeOrigin: true,
	proxyTimeout: 1000 * 60 * 5 // 5 minutes
};
module.exports = {
	static: false, // { directory: path.join(__dirname, './dist') },
	port: 8081,
	open: false, //体验不好，经常不生效，自定义插件
	hot: true,
	historyApiFallback: true,
	allowedHosts: 'auto',
	client: {
		progress: true,
		overlay: {
			errors: true,
			warnings: false
		}
	},
	proxy: {
		'/api': {
			target: 'http://spzy-dev.office.gz:8041',
			pathRewrite: {
				'^/api': ''
			},
			...PROXY_CONF
		},
		'/test': {
			target: 'http://spzy-test.office.gz:8041',
			pathRewrite: {
				'^/test': ''
			},
			...PROXY_CONF
		},
		'/uat': {
			target: 'http://spzy-uat.office.gz:8041',
			pathRewrite: {
				'^/uat': ''
			},
			...PROXY_CONF
		}
	}
};
