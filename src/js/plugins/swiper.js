import Swiper from 'swiper/bundle';
class SwiperSlider {
    constructor() {

    }

    initSlider() {
        const swiper = new Swiper('.modal__content-block', {
            slidesPerView: 1,
            speed: 400,
            grabCursor: true,
        });
    }
}

const swiperSlider = new SwiperSlider();

export default swiperSlider;



