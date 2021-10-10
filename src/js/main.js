import config from './config/apiConfig';
import './plugins/index';
import storage from './store/storage';
import './modules/canvas';



document.addEventListener('DOMContentLoaded', () => {
	appInit();

	async function appInit() {
		config.testWebP(function (support) {
			if (support == true) {
				document.querySelector('html').classList.add('_webp');
			} else {
				document.querySelector('html').classList.add('_no-webp');
			}
		});
	}

});




