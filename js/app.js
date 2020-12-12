const $app = document.getElementById('app'),
	$camera = document.getElementById('camera'),
	$canvas = document.getElementById('photo-taker'),
	$btnTakePhoto = document.getElementById('btn-take-photo'),
	$btnDelete = document.getElementById('btn-delete'),
	$btnDownload = document.getElementById('btn-download'),
	$photoPreview = document.getElementById('photo-preview');

const cameraConstraints = {
	audio: false,
	video: {
		width: { min: 1024, ideal: 1280, max: 1920 },
		height: { min: 576, ideal: 720, max: 1080 },
		facingMode: 'user',
	},
};

let stream = null,
	width = null,
	height = null,
	isPhotoAvailable = false;

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

const takePhoto = () => {
	const sound = new Audio('audio/sound.mp3');
	sound.play();
	const ctx = $canvas.getContext('2d');
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

const showBigPhoto = () => {
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

const init = async () => {
	if (navigator.mediaDevices) {
		try {
			stream = await navigator.mediaDevices.getUserMedia(
				cameraConstraints
			);
			$camera.srcObject = stream;
			$camera.onloadedmetadata = (e) => {
				document.getElementById('loader').remove();
				$btnTakePhoto.classList.remove('btn--take-unavailable');
				$camera.play();
				width = $camera.videoWidth;
				height = $camera.videoHeight;
				$canvas.width = width;
				$canvas.height = height;
				$btnTakePhoto.addEventListener('click', takePhoto);
				$btnDelete.addEventListener('click', deletePhoto);
				$btnDownload.addEventListener('click', downloadPhoto);
				$photoPreview.addEventListener('click', showBigPhoto);
			};
		} catch (err) {
			console.log(err);
		}
	}
};

init();
