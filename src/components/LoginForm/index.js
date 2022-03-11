import { Button, Form, Input, Row } from 'antd';
import { HXIcon } from 'components/Common/StatelessComponent';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const FormItem = Form.Item;

@withRouter
@inject('appStore')
@observer
class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	formRef = React.createRef();
	static propTypes = {
		onLoginCallback: PropTypes.func
	};

	static defaultProps = {
		onLoginCallback: () => {}
	};

	onFinish = async (values) => {
		const { loginSubmit, loading } = this.props.appStore;

		values.type = 'HEXIN';

		if (loading) {
			return;
		}
		const loginRes = await loginSubmit(values);
		if (loginRes && loginRes.code === 200) {
			this.props.history.push('/');
		}
	};

	render() {
		const { loading } = this.props.appStore;

		const inputStyle = { height: '50px', fontSize: '16px' };
		const createInputLabel = (text) => (
			<div className={'label-row'}>
				<span className={'label-text'}>{text}</span>
			</div>
		);
		const LoginFormEle = (
			<Form ref={this.formRef} onFinish={this.onFinish}>
				{createInputLabel('登录账号')}
				<FormItem
					style={{ zIndex: 1 }}
					name={'username'}
					rules={[{ required: true, message: '请输入用户名！' }]}
				>
					<Input
						style={inputStyle}
						prefix={<HXIcon className={'hx-prefix-icon'} type="hx-user" />}
						placeholder={'请输入您的用户名'}
					/>
				</FormItem>
				{createInputLabel('登录密码')}
				<FormItem
					style={{ height: '35px', zIndex: 1 }}
					name={'password'}
					rules={[{ required: true, message: '请输入密码！' }]}
				>
					<Input.Password
						style={inputStyle}
						prefix={<HXIcon className={'hx-prefix-icon'} type="hx-lock" />}
						placeholder="请输入您的密码"
					/>
				</FormItem>
				<div id="login-btn-wrap">
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-btn block-btn"
						loading={loading}
						disabled={loading}
					>
						立即登录
					</Button>
				</div>
			</Form>
		);

		return (
			<div>
				<Row style={{ height: '100%' }}>
					<div className={'screen-title-wrap'}>
						<p>和信保理业务平台</p>
					</div>
					<div style={{ textAlign: 'center' }}>
						<div id="form-input-wrap">{LoginFormEle}</div>
					</div>
				</Row>
			</div>
		);
	}
}
export default LoginForm;
