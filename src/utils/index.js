/**
 * Created by xun on 2017/9/5.
 */
import { Modal } from 'antd';
import moment from 'dayjs';
import React from 'react';
import { appStore } from 'stores/index';
/*、*
 * 提示系统的配置错误 的弹窗，必须退出重新登录
 * @no-tests
 * */

require('dayjs/locale/zh-cn'); //必须手动加载，webpack 已忽略所有本地化
moment.locale('zh-cn');

/**
 * momentjs 格式成 2017-09-12
 * */

export const formatMomentToString = (mDate, format = 'YYYY-MM-DD') => {
	return mDate ? moment(mDate).format(format) : null;
};
/**
 * 把2017-12-12 字符串的格式实例化成 moment
 * */
export const convertStringToMoment = (dateStr) => {
	if (!dateStr || dateStr < 1) {
		return undefined;
	}
	const m = moment(dateStr);
	if (m.isValid()) {
		return m;
	} else {
		return undefined;
	}
};

/**
 * 格式化时间戳 成字符串
 * 兼容秒、毫秒
 *
 * */
export const formatTimeStampToString = (date, format = 'YYYY-MM-DD') => {
	if (!date > 0) {
		return null;
	}

	if (String(date).indexOf('-') > -1) {
		return date;
	}
	const mDate = Number.parseInt(date);
	const stampLength = String(mDate).length;
	let nDate = mDate;
	if (stampLength === 10) {
		nDate = nDate * 1000;
	}
	return formatMomentToString(nDate, format);
};

export const showTypeDictErrorModal = () => {
	window.localStorage.setItem('showTypeDictErrorModal', 'true'); //只显示一次
	Modal.confirm({
		title: 'Ohh,系统配置错误，请重新登录!!',
		content: '请点击【退出登录】，重新登来更新系统配置！请勿直接刷新页面！',
		maskClosable: false,
		centered: true,
		iconType: 'close-circle',
		okText: '退出登录',
		cancelText: '再等等',

		keyboard: false,
		onCancel: () => {
			window.localStorage.setItem('showTypeDictErrorModal', 'false');
			showTypeDictErrorModal();
		},
		onOk: () => {
			appStore.logout(() => {
				window.localStorage.setItem('showTypeDictErrorModal', 'false');
				Promise.resolve();
			});
		}
	});
};
