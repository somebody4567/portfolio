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

        console.log(this.animItems);
    }

    animOnScroll() {
        for (let index = 0; index < (this.animItems).length; index++) {
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
            } /* else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            } */
        }
    }

    offset(el) {
        const rect = el.getBoundingClientRect(),
              scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
}

const animateElemsByScroll = new AnimateElemsByScroll();
export default animateElemsByScroll;