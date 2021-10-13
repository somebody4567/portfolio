import config from './config/apiConfig';
import './plugins/index';
import storage from './store/storage';
import './modules/bubblesCanvas';
import projectsCardHover from './views/projectsCardHover';
import filterCards from './views/filterCards';
import modalConfig from './modules/modalConfiguration';
import api from './services/apiServices';


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
		api.onSubmit();
	}

});




