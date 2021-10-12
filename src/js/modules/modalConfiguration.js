import calcScrollBarOffset from '../modules/calcScrollBarOffset';
import storage from '../store/storage';

class ModalConfiguration {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalContent = this.modal.querySelector('.modal__content');
        this.btns = document.querySelectorAll('.projects__wrapper-btn');
        this.close = document.querySelector('.modal__content-close');
    }

    init() {
        this.openModal();
        this.closeModal();
    }

    openModal() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.modal.style.display = 'flex';
                this.modalContent.classList.remove('customZoomOut');
                this.modalContent.classList.add('customZoomIn');
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = calcScrollBarOffset.init();
                this.modal.style.paddingRight = calcScrollBarOffset.init();
            });
        }); 
    }

    closeModal() {
        this.modal.addEventListener('click', e => {
            const t = e.target;
            if (t && (t == this.modal || t.classList.contains('modal__content-close'))) {
                this.modalContent.classList.remove('customZoomIn');
                this.modalContent.classList.add('customZoomOut');
                this.modal.addEventListener('animationend', e => (e.animationName == 'customZoomOut' ? this.modal.style.display = 'none' : ''));
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
                this.modal.style.paddingRight = '0px';
            }
        });
    }
}

const modalConfig = new ModalConfiguration();

export default modalConfig;