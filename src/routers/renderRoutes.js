/**
 * Created by xun on  2020/9/14 16:02.
 description: renderRoutes
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { createNotFoundRoute } from './utils';

/**
 * 将路由配置渲染成节点
 * @param routes switch路由列表, 参考react-router-config
 * @param userInfo 已登录的用户信息
 * @param multipleRoutes 非switch路由列表，将会在Switch节点前渲染Route
 * @param extraProps 添加额外的Route props
 * @param switchProps Switch props
 */
// 顶层使用路由渲染，第二参数<可选>:当前登录用户的权限
//renderRoutes(routes,user.authed)
// 子层组件路由渲染，第二参数若不通过props.route.authed获取顶层传的user.authed，则默认可访问该routes列表下的所有路由
//renderRoutes(props.route.routes,<props.route.authed>,<props.route.multipleRoutes>,...)

function renderRoutes(routes, userInfo = {}, multipleRoutes, extraProps, switchProps) {
	let list = [];
	const authed = !!userInfo.loginAccount;
	const mapFunc = (R) =>
		R.map((route, i) => (
			<Route
				key={route.key || i}
				path={route.path}
				exact={route.exact}
				strict={route.strict}
				render={(props) => {
					// 将authed赋值到route，试子组件可以通过route.authed获取当前用户权限
					if (authed) {
						route.userInfo = userInfo;
					}

					// 无需登录检查，已登录，已在登录页面，否则跳转登录界面
					if (!route.authRequired || authed || route.path === '/login') {
						return route.render
							? route.render({ ...props, ...extraProps, route: route })
							: route.component && <route.component {...props} {...extraProps} route={route} />;
					} else {
						return <Redirect to={{ pathname: 'login', state: { from: props.location } }} />;
					}
				}}
			/>
		));
	if (routes) {
		list.push(
			<Switch {...switchProps} key="HxSwitchRoute">
				{mapFunc(routes)}
				{createNotFoundRoute()}
			</Switch>
		);
		// 将非Switch包裹的Route挂载到Switch节点之前
		multipleRoutes && list.unshift(...mapFunc(multipleRoutes));
		// 返回一个数组，[<Route/>,...,<Route/>,<Switch>...</Switch>]（实际元素并非如此结构，此处仅为方便说明写的伪代码），React会将数组渲染成节点
		return list;
	}
}

export default renderRoutes;
