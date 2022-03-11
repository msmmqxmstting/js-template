/**
 * Created by xun on  2021/1/5 17:38.
 * description: EventBus
 */
class EventBus {
	constructor() {
		this.handleMaps = {}; // 初始化一个存放订阅回调方法的执行栈
	}

	// 订阅方法，接收两个参数
	// type: 类型名称
	// handler：订阅待执行的方法
	on(type, handler) {
		if (!(handler instanceof Function)) {
			throw new Error('handler必须是函数类型'); // handler 必须是可执行的函数
		}
		// 如果类型名不存在，则新建对应类型名的数组
		if (!(type in this.handleMaps)) {
			this.handleMaps[type] = [];
		}
		// 将待执行方法塞入对应类型名数组
		this.handleMaps[type].push(handler);
	}
	// 发布方法，接收两个参数
	// type：类型名称
	// params：传入待执行方法的参数
	emit(type, params) {
		if (type in this.handleMaps) {
			this.handleMaps[type].forEach((handler) => {
				// 执行订阅时，塞入的待执行方法，并且带入 params 参数
				handler(params);
			});
		}
	}
	// 销毁方法
	off(type) {
		if (type in this.handleMaps) {
			delete this.handleMap[type];
		}
	}
}

export default new EventBus();
