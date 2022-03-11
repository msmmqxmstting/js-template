/**
 * Created by xun on  2021/1/5 18:05.
 * description: env
 */
/**
 * 运行环境的定义
 * */
export const PROCESS_ENV_MAPPING = {
	development: { value: 'development', text: '开发', color: '#ff001e' },
	'production:dev': { value: 'production:dev', text: '开发', color: '#f50' },
	'production:test': { value: 'production:test', text: '测试', color: '#87d068' },
	'production:uat': { value: 'production:uat', text: 'UAT', color: '#2db7f5' },
	'production:prod': { value: 'production:prod', text: '正式' }
};
// 判断环境
export const CURRENT_NODE_ENV = process.env.NODE_ENV || 'development';
export const CURRENT_NODE_ENV_SETUP = PROCESS_ENV_MAPPING[CURRENT_NODE_ENV];
export const IS_LOCAL_DEV = process.env.NODE_ENV === PROCESS_ENV_MAPPING.development.value;
export const IS_DEV_DEBUG_ENV =
	process.env.NODE_ENV === PROCESS_ENV_MAPPING.development.value ||
	process.env.NODE_ENV === PROCESS_ENV_MAPPING['production:dev'].value;
export const IS_TEST_ENV = process.env.NODE_ENV === PROCESS_ENV_MAPPING['production:test'].value;
export const IS_UAT_ENV = process.env.NODE_ENV === PROCESS_ENV_MAPPING['production:uat'].value;
export const IS_PROD_ENV = process.env.NODE_ENV === PROCESS_ENV_MAPPING['production:prod'].value;
