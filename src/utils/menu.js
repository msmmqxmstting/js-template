/**
 * Created By xun  on 2019-05-16 11:50.
 * Description: menu
 */
import { Icon, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';
const { SubMenu } = Menu;
/**
 *
 * data的最小化配置格式 [{key：’key‘，path:'/path',text:'菜单名'}]
 * */
export const renderMenuItem = (data = [], options = { showIcon: true }) => {
	return data.map((s, i) => {
		return (
			<Menu.Item key={s.key}>
				<NavLink to={s.path} activeClassName={'menu-selected'}>
					{options.showIcon && <Icon style={s.iconStyle} type={s.icon} />}
					<span>{s.text}</span>
				</NavLink>
			</Menu.Item>
		);
	});
};
export const renderSubMenuWithItem = (
	data,
	options = { subKey: null, subIcon: null, subTitle: null }
) => {
	const { subKey, subIcon, subTitle } = options;
	return (
		<SubMenu
			key={subKey}
			title={
				<div>
					<Icon type={subIcon} /> <span> {subTitle}</span>
				</div>
			}
		>
			{renderMenuItem(data, options)}
		</SubMenu>
	);
};
