/**
 * Created by xun on  2020/10/27 16:56.
 * description: threadLoader
 */
const threadLoader = require('thread-loader');

const jsWorkerPool = {
	// options

	// 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
	// 当 require('os').cpus() 是 undefined 时，则为 1
	// workers: 2,

	// 闲置时定时删除 worker 进程
	// 默认为 500ms
	// 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
	 // poolTimeout: 2000
};

const cssWorkerPool = {
	// 一个 worker 进程中并行执行工作的数量
	// 默认为 20
	// workerParallelJobs: 4,
	// poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);
module.exports = { jsWorkerPool, cssWorkerPool };
