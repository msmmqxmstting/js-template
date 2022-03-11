import React from 'react';
import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

export const SpinIndicator = <Loading3QuartersOutlined style={{ fontSize: 30 }} spin />;
Spin.setDefaultIndicator(SpinIndicator);

export default function ({ children, ...props }) {
	return (
		<Spin indicator={SpinIndicator} {...props}>
			{children}
		</Spin>
	);
}
