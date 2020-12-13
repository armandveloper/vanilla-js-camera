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
	height = null;

const init = async () => {
	if (navigator.mediaDevices) {
		try {
			stream = await navigator.mediaDevices.getUserMedia(
				cameraConstraints
			);
			await import('https://kit.fontawesome.com/4500871b95.js');
			const {
				$camera,
				$canvas,
				$btnTakePhoto,
				$btnDelete,
				$btnDownload,
				$photoPreview,
				showBigPhoto,
				takePhoto,
				deletePhoto,
				downloadPhoto,
			} = await import('./modules/camera.js');
			$camera.srcObject = stream;
			$camera.onloadedmetadata = async (e) => {
				document.getElementById('loader').remove();
				$btnTakePhoto.classList.remove('btn--take-unavailable');
				$camera.play();
				width = $camera.videoWidth;
				height = $camera.videoHeight;
				$canvas.width = width;
				$canvas.height = height;
				$btnTakePhoto.addEventListener('click', () =>
					takePhoto(width, height)
				);
				$btnDelete.addEventListener('click', deletePhoto);
				$btnDownload.addEventListener('click', downloadPhoto);
				$photoPreview.addEventListener('click', () =>
					showBigPhoto(width, height)
				);
			};
		} catch (err) {
			console.log(err);
		}
	}
};

const handleOrientation = (e) => {
	console.log(e);
};

window.screen.orientation.addEventListener('change', handleOrientation, true);
init();
