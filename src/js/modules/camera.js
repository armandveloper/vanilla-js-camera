const $app = document.getElementById('app'),
	$camera = document.getElementById('camera'),
	$canvas = document.getElementById('photo-taker'),
	$btnTakePhoto = document.getElementById('btn-take-photo'),
	$btnFlip = document.getElementById('btn-flip'),
	$btnDelete = document.getElementById('btn-delete'),
	$btnDownload = document.getElementById('btn-download'),
	$photoPreview = document.getElementById('photo-preview');

let isPhotoAvailable = false;

let isCanvasFlipped = false;

const showSecondaryButtons = () => {
	if (!isPhotoAvailable) return;
	$btnDelete.classList.add('show');
	$btnDownload.classList.add('show');
};

const hideSecondaryButtons = () => {
	if (isPhotoAvailable) return;
	$btnDelete.classList.remove('show');
	$btnDownload.classList.remove('show');
};

const takePhoto = (width, height, mode) => {
	const sound = new Audio('audio/sound.mp3');
	sound.play();
	const ctx = $canvas.getContext('2d');
	if (!isCanvasFlipped && mode === 'user') {
		// Flip the canvas, so the image generated is right
		ctx.translate(width, 0);
		ctx.scale(-1, 1);
		isCanvasFlipped = true;
	} else if (
		(isCanvasFlipped && mode === 'environment') ||
		!isCanvasFlipped
	) {
		ctx.translate(0, 0);
		ctx.scale(1, 1);
		isCanvasFlipped = false;
	}
	ctx.drawImage($camera, 0, 0, width, height);
	const imgData = $canvas.toDataURL('image/jpeg');
	$photoPreview.src = imgData;
	$photoPreview.classList.remove('photo__preview--unavailable');
	isPhotoAvailable = true;
	showSecondaryButtons();
};

const deletePhoto = () => {
	if (!isPhotoAvailable) return;
	$photoPreview.classList.remove('show');
	isPhotoAvailable = false;
	hideSecondaryButtons();
	$photoPreview.classList.add('photo__preview--unavailable');
};

const downloadPhoto = () => {
	if (!isPhotoAvailable) return;
	const link = document.createElement('a');
	link.download = 'img-' + new Date().getTime();
	link.href = $photoPreview.getAttribute('src');
	link.click();
};

const showBigPhoto = (width, height) => {
	const $modalContainer = document.createElement('div');
	$modalContainer.className = 'modal__overlay';
	const $bigImg = new Image(width, height);
	$bigImg.alt = 'Image view';
	$bigImg.src = $photoPreview.getAttribute('src');
	$bigImg.className = 'modal__img';
	$modalContainer.appendChild($bigImg);
	$app.appendChild($modalContainer);
	$modalContainer.addEventListener('click', ({ target }) => {
		if (target === $modalContainer) {
			$modalContainer.classList.add('out');
			setTimeout(() => $modalContainer.remove(), 405);
		}
	});
};

const changeCamera = async (mode, constraints) => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { ...constraints, facingMode: { ideal: mode } },
		});
		$camera.srcObject = stream;
		$camera.onloadedmetadata = () => {
			if (mode === 'user') {
				$camera.classList.add('flip');
			} else {
				$camera.classList.remove('flip');
			}
			$camera.play();
		};
	} catch (error) {
		console.log(err);
	}
};

export {
	$camera,
	$canvas,
	$btnTakePhoto,
	$btnFlip,
	$btnDelete,
	$btnDownload,
	$photoPreview,
	showBigPhoto,
	takePhoto,
	downloadPhoto,
	deletePhoto,
	changeCamera,
};
