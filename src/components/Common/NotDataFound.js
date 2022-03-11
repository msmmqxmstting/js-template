import { FrownOutlined } from '@ant-design/icons';
/**
 * Created by xun on 2017/10/16.
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class NotDataFound extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		tipsText: PropTypes.string,
		paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	};
	static defaultProps = {
		paddingTop: '15px',
		height: '50px',
		tipsText: '暂无数据',
		paddingLeft: '45%'
	};

	render() {
		const style = {
			color: '#979797',
			fontWeight: 'lighter',
			fontSize: '12px',
			paddingTop: this.props.paddingTop,
			paddingLeft: this.props.paddingLeft
		};
		return (
			<div style={{ minHeight: this.props.height, background: '#fefefe' }}>
				<div style={style}>
					<FrownOutlined style={{ paddingTop: '3px' }} />
					&nbsp;
					{this.props.tipsText}
				</div>
			</div>
		);
	}
}
