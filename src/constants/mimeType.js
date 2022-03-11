/**
 * 定义系统使用的上传文件类型
 * */

import { isValueValid } from '@hx/jsu/lib/shared/functions';

export const EXCEL_MIMETYPE =
	'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,';

export const WORD_MIMETYPE =
	'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,';

export const PPT_MIMETYPE =
	'application/vnd.ms-powerpoin,application/vnd.openxmlformats-officedocument.presentationml.presentation,';

export const ZIP_MIMETYPE = 'application/zip';

export const PDF_MIMETYPE = 'application/pdf,';
export const PDF_TYPE = PDF_MIMETYPE;
export const FAVICON_MIMETYPE = 'image/x-icon';

export const IMAGE_PNG_JPEG_JPG_MIMETYPE = 'image/jpeg,image/jpg,image/png';
export const BASE64_PNG_PREFIX = 'data:image/png;base64,';

export const TEXT_MIMETYPE = 'text/plain,';

export const ALL_DEFINED_MIME_MIMETYPE =
	EXCEL_MIMETYPE +
	WORD_MIMETYPE +
	PPT_MIMETYPE +
	PDF_MIMETYPE +
	IMAGE_PNG_JPEG_JPG_MIMETYPE +
	TEXT_MIMETYPE;

export const BASE64_PDF_PREFIX = 'data:application/pdf;base64,';
export const BASE64JPG_PREFIX = 'data:image/jpg;base64,';
export const BASE64_ICO_PREFIX = 'data:image/x-icon;base64,';
/**
 * 根据文件名提取后缀名
 * */
export const extractExtByFileName = (filename) => {
	if (!isValueValid(filename)) {
		return '.txt';
	}
	const fileNameArr = filename.split('.');
	const length = fileNameArr.length;
	return fileNameArr[length - 1];
};
