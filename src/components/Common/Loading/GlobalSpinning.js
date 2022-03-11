import { Progress, Spin } from 'antd';
import { inject, observer } from 'mobx-react';

/**
 * Created By xun  on 2018-09-19 12:13.
 * Description: Downloading 上传、下载文件的进度显示
 */
import React, { Component } from 'react';
import { APP_PRIMARY_COLOR } from 'constants/colors';
import Loading from './Loading';

@inject('appStore')
@observer
export default class DownloadingSpin extends Component {
	render() {
		const { appStore } = this.props;
		/*	const appStore = {
			loading: true,
			downloadProgress:40
		};*/
		const percent = appStore.downloadProgress;
		return (
			<div
				className={appStore.loading ? 'ant-modal-wrap' : ''}
				style={{ background: '#f1f1f16e', zIndex: 9999 }}
			>
				<Loading
					spinning={appStore.loading}
					tip={
						<div style={{ marginTop: 50, width: '100%', marginLeft: 15, padding: '20px 50px' }}>
							<div>
								{percent > 0 && (
									<Progress
										percent={percent}
										type={'circle'}
										strokeColor={APP_PRIMARY_COLOR}
										status={percent < 100 ? 'active' : 'success'}
									/>
								)}
							</div>
							<p>正在处理请求。请耐心等候。请勿刷新页面。</p>
						</div>
					}
					style={{ position: 'fixed', top: '20%' }}
				>
					<span style={{ display: 'none' }} />
				</Loading>
			</div>
		);
	}
}
