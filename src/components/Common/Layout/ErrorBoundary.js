/**
 * Created By xun  on 2018-06-28 14:31.
 * Description: ErrorBoundary
 */
import React from 'react';
import { Button, Col, Row } from 'antd';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
		// You can also log error messages to an error reporting service here
	}

	render() {
		const { error, errorInfo } = this.state;
		if (errorInfo) {
			// Error path
			return (
				<div id={'error-boundary-wrap'}>
					<h1 style={{ color: 'red' }}>捕捉到错误啦！</h1>
					<Row>
						<Col span={12} offset={1}>
							<section style={{ whiteSpace: 'pre-wrap' }}>
								{error && error.toString()}
								<br />
								{errorInfo.componentStack}
							</section>
						</Col>
						<Col span={10}>
							<Row>
								<img src={'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg'} />
							</Row>
							<a href={'/'}>
								<Button
									style={{ width: 180, height: 40, marginTop: 40, marginLeft: 140 }}
									type="primary"
								>
									<span>返回首页</span>
								</Button>
							</a>
						</Col>
					</Row>
				</div>
			);
		}
		// Normally, just render children
		return this.props.children;
	}
}
