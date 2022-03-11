/**
 * Created by xun on  2021/9/1 15:28.
 * description: index
 */
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import Viewer from 'react-viewer';
const ImageViewer = ({ images, visible = false, onClose = () => {} }) => {
	if (!images) {
		return;
	}

	const onCloseRequest = () => {
		onClose();
	};
	const imgs = Array.isArray(images) ? images.map((src) => ({ src, alt: '' })) : [{ src: images }];
	return (
		visible && (
			<Viewer visible={visible} onClose={onCloseRequest} images={imgs} downloadable noNavbar />
		)
	);
};

export default ImageViewer;
