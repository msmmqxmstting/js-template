/**
 * Created By xun  on 2018-11-19 16:43.
 * Description: config
 */

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
/* eslint-disable global-require */
// 模拟window属性
if (typeof window !== 'undefined') {
	global.window.resizeTo = (width, height) => {
		global.window.innerWidth = width || global.window.innerWidth;
		global.window.innerHeight = height || global.window.innerHeight;
		global.window.dispatchEvent(new Event('resize'));
	};
	global.window.scrollTo = () => {};
	global.window.matchMedia = function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {}
		};
	};
}

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = function (cb) {
	return setTimeout(cb, 0);
};

global.cancelAnimationFrame = function (cb) {
	return clearTimeout(cb, 0);
};

global.fetch = require('jest-fetch-mock');

configure({ adapter: new Adapter() });
