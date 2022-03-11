/**
 * Created by xun on  2021/9/1 17:47.
 * description: index
 */
import React from 'react';
import { Descriptions, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// columns的定义
/*{
	/!** true时，该字段将会隐藏，boolean  *!/
	hide?: boolean;
	/!** 键值，string *!/
	key?: string;
	/!** 键值，string 0.5.9版本*!/
	dataIndex?: string;
	/!** 标题，string|ReactNode *!/
	title: string | React.ReactNode;
	/!** 标题提示信息，string|ReactNode *!/
	tip?: string | React.ReactNode;
	/!** 标题根据数据动态渲染，function，参数为当前数据  *!/
	titleRender?: (data: IObject) => any;
	/!** 可独占一行 *!/
	oneLine?: boolean;
	/!** 数据自定义显示 *!/
	render?: (value: any, data: IObject) => void;
}*/
// maxColNumber 标签与值为1列
const StaticTable = ({
	data,
	columns,
	maxColNumber = 2,
	bordered = true,
	enableFilter = false,
	wrapProps = {},
	itemProps = {}
}) => {
	if (!(data && Array.isArray(columns))) {
		return '';
	}
	const _columns = enableFilter ? columns.filter((item) => !item.hide) : columns;
	const renderContent = (titleObj) => {
		const { dataIndex, key, render } = titleObj;
		const dataKey = dataIndex || key;
		if (!dataKey) {
			return ' ';
		}

		const value = data && data[dataKey];
		return typeof render === 'function' ? render(value, data) : value ? value : '无';
	};
	const renderTitle = (titleObj) => {
		const { titleRender, tip } = titleObj;
		if (typeof titleRender === 'function') {
			return titleRender(data);
		}
		return (
			<div>
				<span style={{ height: '100%' }}>{titleObj.title}</span>
				{tip && (
					<>
						&nbsp;
						<Tooltip placement={'topRight'} title={tip}>
							<QuestionCircleOutlined />
						</Tooltip>
					</>
				)}
			</div>
		);
	};
	return (
		<Descriptions bordered={bordered} size={'small'} column={maxColNumber} {...wrapProps}>
			{_columns.map((col) => {
				const key = col.dataIndex || col.key;

				return (
					<Descriptions.Item
						labelStyle={{ width: 100 }}
						{...itemProps}
						key={key}
						label={renderTitle(col)}
						span={col.oneLine ? maxColNumber : 1}
					>
						{renderContent(col)}
					</Descriptions.Item>
				);
			})}
		</Descriptions>
	);
};

export default StaticTable;
