import AsyncComponent from 'components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

export const HXLoadable = AsyncComponent;
/**
 * 返回404路由组件
 * */
export const createNotFoundRoute = (_) => (
	<Route path={'*'} exact component={HXLoadable(() => import('components/404'))} />
);
