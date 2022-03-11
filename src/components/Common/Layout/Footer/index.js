import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
/**
 * Created by xun on 2017/11/3.
 */
import React, { Component } from 'react';
import './style.less';
const { Footer } = Layout;

@inject('appStore')
@observer
export default class HXFooter extends Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		disabled: PropTypes.bool
	};

	static defaultProps = {
		disabled: false
	};

	componentDidMount() {}
	render() {
		return (
			<div className={'hx-footer-wrap'}>
				<Footer className={'hx-bg-color'} style={{ textAlign: 'center' }}>
					<p className={'hx-title-f14'}>
						Copyright 2017-
						{new Date().getFullYear()} © 和信(天津)国际商业保理有限公司 Inc.
					</p>

					<span style={{ visibility: 'hidden' }}>【{process.env.NODE_ENV}】</span>
				</Footer>
			</div>
		);
	}
}
