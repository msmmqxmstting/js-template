/**
 * Created By xun  on 2018-11-20 08:54.
 * Description: __Login__.test
 */

import React from 'react';

import { shallowWrap } from '../../../tools/contextWrap';

import PDFViewer from 'components/Common/Files/PDFViewer';

describe('PDF预览组件', () => {
	let useEffect;

	const mockUseEffect = () => {
		useEffect.mockImplementationOnce((f) => f());
	};
	it('PDFViewer正确渲染快照', () => {
		const wrapper = shallowWrap(<PDFViewer pdfFile={'pdf file url'} />);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('PDFViewer缺少pdfFile属性', () => {
		const wrapper = shallowWrap(<PDFViewer />);
		expect(wrapper.text()).toBe('');
	});
/*	it('pdfFile属性改变触发useEffect', () => {
		const wrapper = shallowWrap(<PDFViewer pdfFile={'pdf file url'} />);
		wrapper.setProps({ pdfFile: 'new pdf file url' });
		useEffect = jest.spyOn(React, 'useEffect');
		mockUseEffect();
		const instance = wrapper.instance();
		const spyFn = jest.spyOn(instance, 'setNodesAttrs');
		instance.setNodesAttrs();
		expect(spyFn).toHaveBeenCalled();
	});*/
});
