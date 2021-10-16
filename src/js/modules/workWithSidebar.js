class WorkWithSidebar {
    constructor() {
        this.sidenav = document.querySelector('.header__sidenav');
        this.sidenavChildren = Array.from(this.sidenav.children);
        this.sidenavOverlay = null;
    }

    init() {
        this.sidenavChildren.forEach(li => {
            li.addEventListener('click', () => {
                this.sidenavOverlay = document.querySelector('.sidenav-overlay');
                this.sidenav.removeAttribute('style');

                this.sidenavOverlay.removeAttribute('style');
            });
        });
    }
}

const workWithSidebar = new WorkWithSidebar();

export default workWithSidebar;