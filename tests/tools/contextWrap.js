/**
 * Created By xun  on 2018-11-19 19:02. 自动增加路由、mobx 属性
 * Description: contextWrap
 */
import { BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import { mount, shallow, render } from 'enzyme';
import { appStore } from 'stores';

// Instantiate router context
export const MOCK_REACT_ROUTER = {
	history: new BrowserRouter().history,
	route: {
		location: {},
		match: {}
	}
};

export const createContext = () => ({
	context: { router: MOCK_REACT_ROUTER },
	stores: { appStore },
	childContextTypes: { router: shape({}) }
});
//mount则会进行完整渲染，而且完全依赖DOM API，
// 也就是说mount渲染的结果和浏览器渲染结果说一样的，结合jsdom这个工具，
// 可以对上面提到的有内部子组件实现复杂交互功能的组件进行测试。
export function mountWrap(node) {
	return mount(node, createContext());
}
//shallow渲染叫浅渲染，仅仅对当前jsx结构内的顶级组件进行渲染，
// 而不对这些组件的内部子组件进行渲染，因此，它的性能上最快的，
// 大部分情况下，如果不深入组件内部测试，那么可以使用shallow渲染。
export function shallowWrap(node) {
	return shallow(node, createContext());
}

//render也会进行完整渲染，但不依赖DOM API，而是渲染成HTML结构，并利用cheerio实现html节点的选择，
// 它相当于只调用了组件的render方法，得到jsx并转码为html，
// 所以组件的生命周期方法内的逻辑都测试不到，所以render常常只用来测试一些数据（结构）一致性对比的场景。
export function renderWrap(node) {
	return render(node, createContext());
}
