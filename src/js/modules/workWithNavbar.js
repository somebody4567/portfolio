class WorkWithNavbar {
    constructor() {
        this.navbar = document.querySelector('.header');
        this.prevScrollY = 0;
        this.currentScrollY = 0;
    }

    init() {
        document.addEventListener('scroll', () => {
            this.currentScrollY = window.scrollY;
            if (this.currentScrollY > this.prevScrollY) {
                this.navbar.classList.add('off');
            } else {
                this.navbar.classList.remove('off');
            }
            this.prevScrollY = this.currentScrollY;
        });
    }
}

const workWithNavbar = new WorkWithNavbar();

export default workWithNavbar;