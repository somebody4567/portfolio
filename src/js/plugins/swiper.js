import Swiper from 'swiper/bundle';
class SwiperSlider {
    constructor() {
        this.leftBtn = null;
        this.rightBtn = null;
    }

    initSlider() {
        const swiper = new Swiper('.modal__content-block', {
            slidesPerView: 1,
            speed: 400,
            grabCursor: true,
        });

        this.leftBtn = document.querySelector('.modal__content-left');
        this.rightBtn = document.querySelector('.modal__content-right');

        this.leftBtn.addEventListener('click', () => {
            swiper.slidePrev();
        });
        this.rightBtn.addEventListener('click', () => {
            swiper.slideNext();
        });
    }
}

const swiperSlider = new SwiperSlider();

export default swiperSlider;



