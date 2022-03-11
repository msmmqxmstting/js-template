/**
 * Created by xun on 2017/9/5.
 */

import DownloadingSpin from 'components/Common/Loading/GlobalSpinning';
import { CURRENT_NODE_ENV_SETUP, IS_PROD_ENV } from 'constants/env';
import Favico from 'favico.js';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ROUTES_CFG from 'routers/common/index';
import renderRoutes from 'routers/renderRoutes';
import eventBus from 'services/eventBus';
@inject('appStore')
@observer
class HXApp extends Component {
	//非生产环境设置favicon badge
	setFaviconBadge() {
		if (IS_PROD_ENV) {
			return;
		}
		const envInfo = CURRENT_NODE_ENV_SETUP;
		new Favico({
			type: 'rectangle',
			fontStyle: 100,
			bgColor: envInfo.color,
			animation: 'none'
		}).badge(!IS_PROD_ENV ? envInfo.text : '');
	}
	componentWillUnmount() {}
	componentDidMount() {
		this.setFaviconBadge();
	}

	render() {
		const { userInfo } = this.props.appStore;
		return (
			<div>
				<DownloadingSpin />
				test
				{renderRoutes(ROUTES_CFG, userInfo)}
			</div>
		);
	}
}

export default HXApp;
