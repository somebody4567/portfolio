import config from './config/apiConfig';
import './plugins/index';
import './modules/bubblesCanvas';
import projectsCardHover from './views/projectsCardHover';
import filterCards from './views/filterCards';
import modalConfig from './modules/modalConfiguration';
import api from './services/apiServices';
import workWithNavbar from './modules/workWithNavbar';
import scrollActions from './modules/scroll';
import validateInputs from './modules/validateInputs';

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
		workWithNavbar.init();
		scrollActions.initScrollAnimation();
		scrollActions.correctMovementToSections();
		validateInputs.removeStylesFromInputs();
	}
});




