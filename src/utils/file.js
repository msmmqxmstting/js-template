/**
 * Created By xun  on 2018-12-27 09:07.
 * Description: file 文件的一些处理方法
 */

import { fireGetFileRequest } from 'services/app';
const downloadJS = require('downloadjs');

/**
 *
 * 用于 javascript 下载文档
 * @no-tests
 * */
export const downloadFile = (blobRes, fileName = '') => {
	if (!(blobRes.code === 200 && blobRes.contentType)) {
		return;
	}
	let file = '';
	let name = fileName; // 前端自定义的文件名

	//兼容新旧方法的数据格式
	if (blobRes.data && blobRes.filename) {
		file = blobRes.data;
		name = blobRes.filename.replace('attachment;filename=', '');
	} else {
		file = blobRes;
	}
	downloadJS(file, decodeURI(name), file.type);
};
/**
 *@desc 把文件流转换为 objecturl
 *@author moxx
 *@date 2018/10/16 21:03:49
 *@param
 *@return
 * @no-tests
 */

export const createBlobUrlByBlobRes = (blobRes) => {
	const urlCreator = window.URL || window.webkitURL;
	const blob = new Blob([blobRes], { type: blobRes.type });
	return urlCreator.createObjectURL(blob);
};

/**
 * 打开 pdf\png 在新的 window
 * @no-tests
 * */
export function openRemoteBlobWindow(attachmentId, remoteUrl) {
	let params = { id: attachmentId };
	fireGetFileRequest(remoteUrl, params).then((resp) => {
		const res = resp.data;
		window.open(createBlobUrlByBlobRes(res));
	});
}

/**
 * 自动调整图片宽高
 * @no-tests
 * */
export const autoSizeImg = (Img, maxWidth, maxHeight) => {
	console.log('auto img', Img);
	const image = new Image();
	//原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
	image.src = Img.src;
	// 当图片比图片框小时不做任何改变
	if (image.width < maxWidth && image.height < maxHeight) {
		Img.width = image.width;
		Img.height = image.height;
	} else {
		//原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
		if (maxWidth / maxHeight <= image.width / image.height) {
			//原图片宽高比例 大于 图片框宽高比例
			Img.width = maxWidth; //以框的宽度为标准
			Img.height = maxWidth * (image.height / image.width);
		} else {
			//原图片宽高比例 小于 图片框宽高比例
			Img.width = maxHeight * (image.width / image.height);
			Img.height = maxHeight; //以框的高度为标准
		}
	}

	return Img;
};
