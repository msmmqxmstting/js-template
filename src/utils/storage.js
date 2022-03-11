/**
 * Created By xun  on 2019-01-14 11:34.
 * Description: storage
 */
import { STORAGE_KEY_MAPPING } from 'constants/user';

export const saveItem = (key, value) => window.localStorage.setItem(key, value);

export const getItem = (key) => window.localStorage.getItem(key);

//	保存用户信息
export const saveUserInfo = (info = {}) => {
	saveItem(STORAGE_KEY_MAPPING.IS_LOGINED, 'true');
	saveItem(STORAGE_KEY_MAPPING.AUTH_TOKEN, info.token);
	saveItem(STORAGE_KEY_MAPPING.ROLES, JSON.stringify(info.roles));
	saveItem(STORAGE_KEY_MAPPING.USER_NAME, info.name);
	saveItem(STORAGE_KEY_MAPPING.LOGIN_ACCOUNT, info.loginAccount);
};

//获取本地的用户信息
export const getLocalUserInfo = () => ({
	token: getItem(STORAGE_KEY_MAPPING.AUTH_TOKEN),
	roles: getItem(STORAGE_KEY_MAPPING.ROLES) ? JSON.parse(getItem(STORAGE_KEY_MAPPING.ROLES)) : [],
	name: getItem(STORAGE_KEY_MAPPING.USER_NAME),
	loginAccount: getItem(STORAGE_KEY_MAPPING.LOGIN_ACCOUNT)
});
