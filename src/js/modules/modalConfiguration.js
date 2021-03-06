import scrollActions from '../modules/scroll';
import storage from '../store/storage';
import swiperSlider from '../plugins/swiper';
class ModalConfiguration {
    constructor() {
        this.modal = null;
        this.modalContent = null;
        this.close = null;
        this.btns = document.querySelectorAll('.projects__wrapper-btn');
    }

    init() {
        this.createModal();
    }

    createModal() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                const attrValue = item.getAttribute('data-modal');
                // Запускаем получение данных с сервера (storage.init();) и записываем их в переменную
                storage.init();
                const response = storage.projects;

                response.then(data => {
                    // data.data.projects
                    data.data.projects.forEach(({dataAttribute, linkToSite, gitHubCode, pictures, text, title}) => {
                        if (attrValue == dataAttribute) {
                            this.modal = document.createElement('div');
                            this.modal.classList.add('modal');

                            // Создание слайдов swiper'a
                            const swiperSlides = document.createElement('div');
                            swiperSlides.classList.add('modal__content-wrapper', 'swiper-wrapper');
                            for (let i = 0; i < pictures.length; i++) {
                                swiperSlides.innerHTML += `
                                <div class="modal__content-slide swiper-slide">
                                    <img src="${pictures[i]}" alt="first-screen" class="modal__content-img">
                                </div>
                                `;
                            }
                            // Создание структуры модального окна
                            this.modal.innerHTML = `
                            <div class="modal__content">
                                <div class="modal__content-top">
                                    <div class="modal__content-block swiper">
                                        <div class="modal__content-left waves-effect waves-light"><i class="material-icons">keyboard_arrow_left</i></div>
					                    <div class="modal__content-right waves-effect waves-light"><i class="material-icons">keyboard_arrow_right</i></div>
                                        ${swiperSlides.outerHTML}
                                    </div>
                                </div>
                                <div class="modal__content-bottom">
                                    <div class="material-icons modal__content-close waves-effect waves-grey">close</div>
                                    <h4 class="modal__content-title">${title}</h4>
                                    <p class="modal__content-text">${text}</p>
                                    <div class="modal__content-links">
                                        <a target="_blank" href="${linkToSite}" class="btn red darken-3 waves-effect waves-light modal__content-link">На сайт<i class="material-icons">open_in_new</i></a>  
                                        <a target="_blank" class="modal__content-code" href="${gitHubCode}"><img src="img/skills/gitHub.svg" alt="gitHub-code"></a>
                                    </div>  
                                </div>
                            </div>
                            `;
                            
                            document.body.append(this.modal);
                            this.modalContent = this.modal.querySelector('.modal__content');
                            this.close = document.querySelector('.modal__content-close');

                            if (screen.availWidth > 700) {
                                document.querySelector('.modal__content-wrapper').style.width
                             = (getComputedStyle(document.querySelector('.modal__content')).width.slice(0, 3)) * pictures.length + 'px';
                            }
                            // инициализируем слайдер
                            swiperSlider.initSlider();
                            // инициализируем закрытие модального окна
                            this.closeModal();
                            this.modal.style.display = 'flex';
                            this.modalContent.classList.remove('customZoomOut');
                            this.modalContent.classList.add('customZoomIn');
                            document.body.style.overflow = 'hidden';
                            document.body.style.marginRight = scrollActions.calcScrollBarOffset();
                            this.modal.style.paddingRight = scrollActions.calcScrollBarOffset();
                            this.modal.style.paddingLeft = scrollActions.calcScrollBarOffset();
                        }
                    });
                });
            });
        }); 
    }

    closeModal() {
        this.modal.addEventListener('click', e => {
            const t = e.target;
            if (t && (t == this.modal || t.classList.contains('modal__content-close'))) {
                this.modalContent.classList.remove('customZoomIn');
                this.modalContent.classList.add('customZoomOut');
                this.modal.addEventListener('animationend', e => (e.animationName == 'customZoomOut' ? this.modal.remove() : ''));
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
                this.modal.style.paddingRight = '0px';
            }
        });
    }
}

const modalConfig = new ModalConfiguration();

export default modalConfig;