/**
 * Created By xun  on 2019-10-15 10:11.
 * Description: index
 */

import localforage from 'localforage';
const db = localforage.createInstance({
	name: 'HXBoilerplate',
	description: '必须使用此处 导出的 localforage实例，方便以后扩展'
});

export default db;
