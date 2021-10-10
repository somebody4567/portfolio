class ProjectsCardHover {
    constructor() {
        this.cards = document.querySelectorAll('.projects__wrapper-item');
    }

    init() {
        this.cards.forEach(card => {
            const descr = card.querySelector('.projects__wrapper-descr');
            const btn = card.querySelector('.projects__wrapper-btn');
            const overlay = card.querySelector('.projects__wrapper-overlay');
            card.addEventListener('mouseenter', () => {
                overlay.style.display = 'flex';
                overlay.classList.remove('fadeOut');
                descr.classList.remove('fadeOutUp');
                btn.classList.remove('fadeOutDown');
                overlay.classList.add('fadeIn');
                descr.classList.add('fadeInDown');
                btn.classList.add('fadeInUp');
            }); 

            card.addEventListener('mouseleave', () => {
                overlay.classList.remove('fadeIn');
                descr.classList.remove('fadeInDown');
                btn.classList.remove('fadeInUp');
                overlay.classList.add('fadeOut');
                descr.classList.add('fadeOutUp');
                btn.classList.add('fadeOutDown');
                overlay.addEventListener('animationend', e => (e.animationName == 'fadeOut') ? overlay.style.display = 'none' : '');
            });
        });
    }
}

const projectsCardHover = new ProjectsCardHover();

export default projectsCardHover;