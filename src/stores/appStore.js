import { STORAGE_KEY_MAPPING } from 'constants/user';
import { action, observable } from 'mobx';

import { login, logout } from 'services/app';
import { openNotification, showSuccessMsg } from 'utils/antd';
import { getLocalUserInfo, saveUserInfo } from 'utils/storage';

class AppStore {
	@observable
	userInfo;
	@observable
	isLogined;
	@observable
	loading;
	@observable
	downloadProgress;

	constructor() {
		this.userInfo = getLocalUserInfo();
		this.isLogined = window.localStorage.getItem(STORAGE_KEY_MAPPING.IS_LOGINED);
		this.loading = false;
		this.downloadProgress = 0;
	}

	@action.bound
	loginSubmit = async (values) => {
		this.showLoading();
		const loginRes = await login(values);
		this.hideLoading();
		if (loginRes && loginRes.code !== 200) {
			openNotification('error', '登录失败', loginRes.message);
			return;
		}
		this.userInfo = loginRes;
		this.isLogined = true;
		saveUserInfo(loginRes);
		showSuccessMsg('登录成功');
		return loginRes;
	};

	@action.bound
	logout(successcb = () => {}) {
		logout().then((res) => {
			window.localStorage.clear();
			showSuccessMsg('退出成功', 1);
			this.isLogined = false;
			successcb();
		});
	}

	//全局加载
	@action
	showLoading() {
		this.loading = true;
	}

	@action
	hideLoading() {
		this.loading = false;
	}
	//设置下载的进度条，一般针对文件的请求
	@action
	setDownloadProgress(progress = 0) {
		let complete = progress;
		if (progress < 0) {
			complete = 0;
		}
		if (complete > 100) {
			complete = 100;
		}
		this.downloadProgress = complete;
	}
}

const appStore = new AppStore();

export default appStore;
export { AppStore };
