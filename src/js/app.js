let existsFrontCamera = false;
let cameraMode = existsFrontCamera ? 'user' : 'environment';
const cameraConstraints = {
	width: { min: 1024, ideal: 1280, max: 1920 },
	height: { min: 576, ideal: 720, max: 1080 },
	facingMode: { ideal: cameraMode },
};

let stream = null,
	width = null,
	height = null;

const init = async () => {
	if (navigator.mediaDevices) {
		try {
			let devices = await navigator.mediaDevices.enumerateDevices();
			devices = devices.filter((dev) => dev.kind === 'videoinput');
			existsFrontCamera =
				devices.filter((dev) => dev.label.includes('front')).length > 0;
			stream = await navigator.mediaDevices.getUserMedia({
				video: { ...cameraConstraints },
			});
			await import('https://kit.fontawesome.com/4500871b95.js');
			const {
				$camera,
				$canvas,
				$btnTakePhoto,
				$btnFlip,
				$btnDelete,
				$btnDownload,
				$photoPreview,
				showBigPhoto,
				takePhoto,
				deletePhoto,
				downloadPhoto,
				changeCamera,
			} = await import('./modules/camera.js');
			$camera.srcObject = stream;
			$camera.onloadedmetadata = () => {
				if (cameraMode === 'user') {
					$camera.classList.add('flip');
				}
				document.getElementById('loader').remove();
				if (!existsFrontCamera) {
					$btnFlip.remove();
				} else {
					$btnFlip.classList.remove('btn--flip--unavailable');
				}
				$btnTakePhoto.classList.remove('btn--take-unavailable');
				$camera.play();
				width = $camera.videoWidth;
				height = $camera.videoHeight;
				$canvas.width = width;
				$canvas.height = height;
				$btnTakePhoto.addEventListener('click', () =>
					takePhoto(width, height, cameraMode)
				);
				if (existsFrontCamera) {
					$btnFlip.addEventListener('click', () => {
						cameraMode =
							cameraMode === 'user' ? 'environment' : 'user';
						changeCamera(cameraMode, cameraConstraints);
					});
				}
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

const handleOrientation = () => {
	// Change the resolution of the image, so its proportional
	[width, height] = [height, width];
};

window.screen.orientation.addEventListener('change', handleOrientation, true);
init();
