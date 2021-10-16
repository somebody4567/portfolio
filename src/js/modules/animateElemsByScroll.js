class AnimateElemsByScroll {
    constructor() {
        this.animItems = document.querySelectorAll('._anim-items');
        this.animScrollModified = this.animOnScroll.bind(this);
    }

    init() {
        try {
            if (this.animItems.length > 0) {
                window.addEventListener('scroll', this.animScrollModified);
    
                setTimeout(() => {
                    this.animScrollModified();
                }, 300);
            }
        } catch(e) {}
    }

    /* animOnScroll() {
        for (let index = 0; index < this.animItems.length; index++) {
            const animItem = this.animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = this.offset(animItem).top;
            const animStart = 2;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
        }
    } */

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
}

const animateElemsByScroll = new AnimateElemsByScroll();
export default animateElemsByScroll;