import appStore from 'stores/appStore';
import request, { calcAxiosProgress } from 'utils/request';
//登录请求
export const login = (values) => {
	return firePostRequest('', values);
};
//退出登录
export const logout = (values = {}) => {
	return firePostRequest('', values);
};

/**
 * 通用下载文件
 * */

export const fireGetFileRequest = async (api, values = {}, responseType = 'blob') => {
	appStore.showLoading();
	const res = await fireGetRequest(api, values, {
		headers: { isDownloadFile: true },
		responseType: responseType
	});

	appStore.hideLoading();
	return Promise.resolve(res);
};

/**
 * 通用上传文件(提交有文件的表单)
 * */
export const firePostUploadFile = async (api, values, config = {}) => {
	config.timeout = 300000;
	config.onUploadProgress = (progressEvent) => {
		const complete = calcAxiosProgress(progressEvent);
		appStore.setDownloadProgress(complete);
	};
	appStore.showLoading();
	const resp = await firePostRequest(api, values, config);
	appStore.hideLoading();
	return Promise.resolve(resp);
};
/**
 * 通用 get 请求
 * toggleLoading 是否启动全局 loading
 * */
export const fireGetRequest = async (api, values = {}, config = {}) => {
	if (config && config.toggleLoading) {
		appStore.showLoading();
	}
	const resp = await request.get(api, { ...config, params: values });

	appStore.hideLoading();
	return Promise.resolve(resp);
};

/**
 * 通用 post 请求
 * toggleLoading 是否启动全局 loading
 * */
export const firePostRequest = async (api, values, config) => {
	if (config && config.toggleLoading) {
		appStore.showLoading();
	}
	const resp = await request.post(api, values, config);

	appStore.hideLoading();
	return Promise.resolve(resp);
};
/**
 *includeInvalidValue 组装 formData 时，空值时，也要append，value 为空串
 * */
export const postFormWithInvalidValue = (api, values, config) =>
	firePostRequest(api, values, {
		headers: { 'Include-Invalid-Value': true },
		...config
	});
/*、*
 *并发
 * */
export const fireAxiosAll = (values = []) => {
	return request.all(values);
};
/**
 * 通用 post 请求-JSON 格式
 * */
export const firePostJsonRequest = (api, values) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	return firePostRequest(api, values, config);
};
