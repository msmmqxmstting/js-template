import { HXAxiosUtil } from '@hx/jsu';
import axios from 'axios';
import { STORAGE_KEY_MAPPING } from 'constants/user';
import appStore from 'stores/appStore';
import { openNotification, showErrorMsg } from 'utils/antd';

axios.defaults.timeout = 18000000;
axios.defaults.baseURL = '/api'; //增加代理路径
axios.defaults.withCredentials = true;

const LOCAL_STORAGE_KEY_OBJ = {
	API_COUNT: STORAGE_KEY_MAPPING.AC,
	AUTH_TOKEN: STORAGE_KEY_MAPPING.AUTH_TOKEN,
	IS_LOGINED: STORAGE_KEY_MAPPING.IS_LOGINED
};
/**
 * token过期或者未登录
 * */
const redirectToLogin = (dataOrErr) => {
	window.localStorage.clear();
	showErrorMsg('登录已失效！请重新登录', 2);
	//	eventBus.emit(EVENT_GO_LOGIN_PAGE, 'token失效');
	window.location.href = '/login';
};
//弹窗错误请求信息
const openErrorNotification = (type, msg) => {
	let data = {};
	try {
		data = JSON.parse(msg.replace('请求出错了: ', ''));
	} catch (e) {
		data = {};
	}
	const config = data.config || {},
		params = config.params || {};
	let content = config.url ? `地址：${config.url || ''}；请求参数：${JSON.stringify(params)}` : '';
	if (data.code && data.message) {
		content = data.message;
	}
	console.log(data, msg);
	openNotification('error', '请求失败', content);
};
const options = {
	redirectToLogin: redirectToLogin,
	openNotification: openErrorNotification,
	showErrorMsg: (msg) => showErrorMsg(msg)
};

/**
 * axios 的上传进度计算
 * */
export const calcAxiosProgress = HXAxiosUtil.calcProgress;

/**
 * 如果登录了，就把token写入header
 * */
//请求拦截

axios.interceptors.request.use(
	(config) => {
		return HXAxiosUtil.initRequestConfig(config, LOCAL_STORAGE_KEY_OBJ, options);
	},
	(error) => {
		return HXAxiosUtil.initRequestError(error);
	}
);

//响应拦截
axios.interceptors.response.use(
	(response) => {
		appStore.hideLoading();
		//console.log(response, 1900);
		if (parseInt(response.data.code) === 500 && response.data.message === 'GENERAL') {
			showErrorMsg('ohh,系统繁忙，请稍后重试！');
		}
		return HXAxiosUtil.initResponseConfig(response, LOCAL_STORAGE_KEY_OBJ, options);
	},
	(error) => {
		appStore.hideLoading();
		return HXAxiosUtil.initResponseError(error, LOCAL_STORAGE_KEY_OBJ, options);
	}
);

export default axios;
