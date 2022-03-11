/**
 * Created By xun  on 2018-12-26 21:56.
 * Description: router
 */
import { splitValidArray } from '@hx/jsu/lib/shared/functions';
import React from 'react';

/**
 * 根据 pathname 设置当前菜单高亮的 key
 * */
export const getMenuSelectedKey = (pathname, defaultKey, position = 0) => {
	if (!pathname) {
		return defaultKey;
	}
	const splitArr = splitValidArray(pathname);
	return splitArr.length > position ? splitArr[position] : defaultKey;
};

//跟 pathname 提取面包屑的数据
export const setBreadcrumbData = (location, title, depth = 1, editDepth = 2) => {
	const { pathname } = location;
	if (!pathname) {
		return [];
	}
	const arr = splitValidArray(pathname);

	if (arr.length > depth) {
		return [
			{ key: 'edit', text: `${arr.length > editDepth ? '编辑' : '添加'}${title}`, path: pathname }
		];
	}

	return [];
};

/**
 * 解析 url 的 search 参数
 * @param search
 * @return object
 * {key:value}
 * */
export const parseUrlSearch = (qs) => {
	if (qs && qs.indexOf('?') > -1 && qs.startsWith('?')) {
		const newQS = qs.replace('?', '');
		const tmpArr = newQS.split('&');
		let finalObj = {};
		tmpArr.forEach((item) => {
			const itemSplit = item.split('=');
			if (itemSplit.length === 2) {
				finalObj[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
			}
		});
		return finalObj;
	}
	return {};
};

/**
 * 把对象拼接成 url search 参数
 * @param object
 *
 * @return string
 * */
export const initObjToUrlSearch = (obj) => {
	let urlQs = '';
	const keys = Object.keys(obj);
	if (obj instanceof Object && keys.length > 0) {
		keys.forEach((s, i) => {
			if (s && obj[s]) {
				if (i === 0) {
					urlQs += `?${s}=${obj[s]}`;
				} else {
					urlQs += `&${s}=${obj[s]}`;
				}
			}
		});
	}

	return urlQs;
};
