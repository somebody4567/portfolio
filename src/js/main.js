import config from './config/apiConfig';
import './plugins/index';
import storage from './store/storage';
import './modules/canvas';
import projectsCardHover from './views/projectsCardHover';
import filterCards from './views/filterCards';



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
	}

});




