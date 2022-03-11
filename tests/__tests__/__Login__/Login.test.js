/**
 * Created By xun  on 2018-11-20 08:54.
 * Description: __Login__.test
 */

import React from 'react';
import LoginPage from 'pages/Login';
import LoginForm from 'components/LoginForm';
import { appStore } from 'stores';
import { MOCK_REACT_ROUTER, mountWrap, shallowWrap } from '../../tools/contextWrap';
import { Router } from 'react-router-dom';
import * as stores from 'stores';
import { Provider } from 'mobx-react';

const loginFormMount = () =>
	mountWrap(
		<Router history={MOCK_REACT_ROUTER.history}>
			<LoginForm appStore={appStore} />
		</Router>
	);
describe('登录页面', () => {
	/*	beforeAll(() => {
		console.log('test1 before all');
	});

	afterAll(() => {
		console.log('test1 after all');
	});

	beforeEach(() => {
		console.log('test1 before each');
	});

	afterEach(() => {
		console.log('test1 after each');
	})
	*/
	it('页面正确渲染快照', () => {
		const wrapper = shallowWrap(
			<Router history={MOCK_REACT_ROUTER.history}>
				<Provider {...stores}>
					<LoginPage appStore={appStore} />
				</Provider>
			</Router>
		);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('表单正确渲染', () => {
		//如果目标组件包含 withRouter属性，必须用<Router>组件包裹
		const wrapper = loginFormMount();
		const btn = wrapper.find('#login-btn-wrap');
		expect(btn.text()).toBe('立即登录');
	});
	it('输入点击发送登录请求', () => {
		const wrapper = loginFormMount();

		wrapper.find('input#username').simulate('change', { target: { value: '111' } });
		wrapper.find('input#password').simulate('change', { target: { value: '222' } });

		expect(wrapper.find('input#username').prop('value')).toBe('111');
		expect(wrapper.find('input#password').prop('value')).toBe('222');
		//组件被装饰器包裹，是一个高阶组件，需要拿instance之前做下find操作，这样才能拿到真实组件的实例
		const instance = wrapper.find('LoginForm').instance();
		// 模拟点击事件
		wrapper.find('#login-btn-wrap').at(0).simulate('click');
		const spyFn = jest.spyOn(instance, 'onFinish');
		instance.onFinish();

		expect(spyFn).toHaveBeenCalled();
		spyFn.mockRestore();
	});
});
