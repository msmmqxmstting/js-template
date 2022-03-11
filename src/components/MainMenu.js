import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import routers from 'routers/index';
const getMenuItems = (routers) => {
	const childMenu = [];
	routers.forEach((item) => {
		if (item.inMenu) {
			if (item.routes) {
				const menuItems = getMenuItems(item.routes);
				if (menuItems.length) {
					childMenu.push(
						<Menu.SubMenu title={item.path} key={item.path}>
							{menuItems}
						</Menu.SubMenu>
					);
				} else {
					childMenu.push(
						<Menu.Item key={item.path}>
							<Link to={item.path}>{item.title || item.path}</Link>
						</Menu.Item>
					);
				}
			} else {
				childMenu.push(
					<Menu.Item key={item.path}>
						<Link to={item.path}>{item.title || item.path}</Link>
					</Menu.Item>
				);
			}
		}
	});
	return childMenu;
};
export default () => <Menu mode="inline">{getMenuItems(routers[0].routes)}</Menu>;
