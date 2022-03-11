/**
 * Created by xun on  2021/9/1 16:07.
 * description: PDFViewer
 */
import React, { useEffect, useRef } from 'react';
export class PDFJSBackend {
	init = (source, element, iframeSrcPrefix = '') => {
		const iframe = document.createElement('iframe');
		iframe.id = 'hxPDFIframe';
		iframe.src = `${iframeSrcPrefix}/hx-pdfjs-dist/web/viewer.html?file=${source}`;
		iframe.width = '100%';
		iframe.height = '100%';
		if (element && element.length > 0) {
			return;
		}
		element.appendChild(iframe);
	};
}

const PDFViewer = ({
	isFromModal = false,
	iframeSrcPrefix,
	pdfFile,
	containerStyle = { height: 600 }
}) => {
	if (!pdfFile) {
		return '';
	}
	const ref = useRef(null);
	const backend = new PDFJSBackend();
	const setNodesAttrs = () => {
		const timeoutFunc = () => {
			const iframe = window.document.getElementById('hxPDFIframe');
			const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
			if (!innerDoc) {
				return;
			}
			const openFileBtn = innerDoc.getElementById('openFile');

			if (!openFileBtn) {
				return;
			}
			openFileBtn.style.display = 'none';
		};

		const tid = setTimeout(timeoutFunc, 1000);
		clearTimeout(tid);
	};

	useEffect(() => {
		backend.init(pdfFile, ref.current, iframeSrcPrefix);
		setNodesAttrs();
		return () => {
			ref.current.innerHTML = '';
		};
	}, [pdfFile]);

	return (
		<div>
			<div
				ref={ref}
				id="hx-pdf-viewer"
				style={{
					width: '100%',
					...containerStyle,
					height: isFromModal ? '100vh' : containerStyle.height || '100%'
				}}
			/>
		</div>
	);
};
export default PDFViewer;
