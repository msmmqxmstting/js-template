/**
 * Created by xun on  2021/9/1 17:20.
 * description: PDFViewerModal
 */
import React from 'react';
import { Modal } from 'antd';
import PDFViewer from './PDFViewer';

const PDFViewerModal = ({
	pdfFile,
	pdfViewerProps = {},
	modalProps = {},
	modalVisible = false,
	onCancelModal = () => {}
}) => {
	return (
		<Modal
			wrapClassName={'preview-pdf-outer-wrap'}
			maskClosable={false}
			className={'preview-pdf-modal-wrap'}
			width={'100vw'}
			style={{
				top: 0,
				background: 'rgb(50, 54, 57)'
			}}
			destroyOnClose
			visible={modalVisible}
			closable
			footer={null}
			onCancel={onCancelModal}
			{...modalProps}
		>
			<PDFViewer {...pdfViewerProps} isFromModal pdfFile={pdfFile} />
		</Modal>
	);
};

export default PDFViewerModal;
