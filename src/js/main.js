import config from './config/apiConfig';
import './plugins/index';
import storage from './store/storage';
import './modules/canvas';
import projectsCardHover from './views/projectsCardHover';
import filterCards from './views/filterCards';
import calcScrollBarOffset from './modules/calcScrollBarOffset';
import modalConfig from './modules/modalConfiguration';


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

		projectsCardHover.init();
		filterCards.init();
		modalConfig.init();
		storage.init();
	}

});




