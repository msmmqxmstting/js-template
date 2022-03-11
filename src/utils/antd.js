/**
 * Created By xun  on 2018-12-27 09:06.
 * Description: antd 封装一些 antd 的方法
 */

import { message, Modal, notification } from 'antd';
import React from 'react';

/**
 * 全局成功的提示
 * @no-tests
 * */
const messageConfig = {
	maxCount: 1
};
export const showSuccessMsg = (msg, duration = 4) => {
	message.config(messageConfig);
	message.success(msg, duration);
};
/**
 * @no-tests
 * 全局警告的提示
 * */
export const showWarningMsg = (msg) => {
	message.warning(msg);
};

/**
 * 全局失败的提示
 * @no-tests
 * */
export const showErrorMsg = (msg, duration = 5, onClose = () => {}) => {
	message.config(messageConfig);
	message.error(msg, duration, onClose);
};

/**
 * 弹出操作结果通知
 * @no-tests
 * */
export const openNotification = (type, title, content, duration = 5) => {
	notification[type]({
		key: title, //相同内容不会增加显示框
		message: title,
		description: <div style={{ padding: 3 }}>{content}</div>,
		duration: duration //自动计算持续时间
		/*	style: {
					width: 350,
					paddingRight: '12px',

				}*/
	});
};

/**
 * 全局confirm的modal
 * @no-tests
 * */
export const openConfirmModal = (
	title,
	content,
	okCallback = () => {},
	cancelCallback = () => {},
	okType = 'primary',
	props = {}
) => {
	const confirm = Modal.confirm;
	confirm({
		title: title,
		content: content,
		okText: '确定',
		okType: okType,
		cancelText: '取消',
		onOk() {
			okCallback();
		},
		onCancel() {
			cancelCallback();
		},
		...props
	});
};

//通用 Modal 的属初始创建
//@no-tests
export const initHXModalProps = (modalVisible, confirmLoading = false) => {
	return {
		visible: modalVisible,
		closable: false,
		width: 900,
		maskClosable: false,
		destroyOnClose: true,
		confirmLoading: confirmLoading,
		wrapClassName: 'hx-form-item-col'
	};
};
