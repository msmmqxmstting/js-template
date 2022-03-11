/**
 * Created By xun  on 2018-12-03 11:12.
 * Description: hot
 */

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import App from 'components/App';
import ErrorBoundary from 'components/Common/Layout/ErrorBoundary';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as stores from 'stores';
import './styles/index.less';

ReactDom.render(
	<ConfigProvider locale={zh_CN}>
		<Provider {...stores}>
			<BrowserRouter>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</BrowserRouter>
		</Provider>
	</ConfigProvider>,
	document.getElementById('app')
);
