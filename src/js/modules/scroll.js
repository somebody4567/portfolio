class Scroll {
    constructor() {
        this.animItems = document.querySelectorAll('._anim-items');
        this.animScrollModified = this.animOnScroll.bind(this);
        this.links = document.querySelectorAll('[data-link]');
        this.navbar = document.querySelector('.header');
        this.scrollIntoView = document.querySelectorAll('[data-scrollIntoView]');
    }

    initScrollAnimation() {
        try {
            if (this.animItems.length > 0) {
                window.addEventListener('scroll', this.animScrollModified);
    
                setTimeout(() => {
                    this.animScrollModified();
                }, 300);
            }
        } catch(e) {}
    }

    animOnScroll() {
        this.animItems.forEach(item => {
            
            const animItemHeight = item.offsetHeight; //вся высота эл 70px 
            const animItemOffset = this.offset(item).top;
            const animStart = 2; // когда начнется анимация

            let animItemPoint = window.innerHeight - animItemHeight / animStart; //  500px - 70 / 2
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                item.classList.add('_active');
            }
        });
    }

    offset(el) {
        const rect = el.getBoundingClientRect(),
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop };
    }

    calcScrollBarOffset() {
        const elem = document.createElement('div');
        elem.style.cssText = `
            width: 50px;
            height: 50px;
            overflow-y: scroll;
        `;
        document.body.append(elem);
        const scroll = elem.offsetWidth - elem.clientWidth;
        elem.remove();
        return `${scroll}px`;
    }

    correctMovementToSections() {
        this.links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                const hrefValue = link.getAttribute('href'); 
                const elem = document.querySelector(hrefValue);
                elem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
}

const scrollActions = new Scroll();

export default scrollActions;