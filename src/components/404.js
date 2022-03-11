import { Button, Row } from 'antd';
import notFoundImg from 'assets/common/404.png';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
	static propTypes = {
		backUrl: PropTypes.string
	};

	static defaultProps = {
		backUrl: '/projects/list'
	};

	render() {
		return (
			<div style={{ textAlign: 'center', padding: 130 }}>
				<div>
					<img alt={'404'} src={notFoundImg} />

					{/*  <Col span={10} offset={2} style={styles.leftColWrapStyle}>
                    <img src={'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg'}/>
                </Col>

                <Col span={6} offset={3} style={styles.rightColWrapStyle}>

                    <h1 style={styles.rightColH1Style}>404</h1>
                    <p style={styles.rightColPStyle}>抱歉，你访问的页面不存在</p>
                    <div style={styles.rightColBtnStyle}>
                        <a href={'projects/list'}>
                            <Button type="primary"><span>返回首页</span></Button>
                        </a>
                    </div>

                </Col>*/}
				</div>

				<div style={{ textAlign: 'center', marginTop: 120, marginBottom: 10 }}>
					<h2 style={{}}>抱歉，你访问的页面不存在</h2>
					<div style={{}}>
						<Link to={'/'}>
							<Button style={{ width: 180, height: 40, marginRight: 10 }} type="primary">
								<span>返回首页</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
