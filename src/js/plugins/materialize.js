import 'materialize-css/dist/js/materialize';


const tabs = document.querySelector('.projects__tabs');
M.Tabs.init(tabs);

const scrollSpy = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(scrollSpy);


export function returnSuccessToast() {
    return M.toast({html: 'Ваше письмо успешно отправлено!'});
}

export function returnFailureToast() {
    return M.toast({html: 'Произошла непредвиденная ошибка...'});
}

// sidenav

const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {
    preventScrolling: false,
});

const sidenavInst = M.Sidenav.getInstance(sideNav);


const sidenav = document.querySelector('.header__sidenav');
const sidenavChildren = Array.from(sidenav.children);


sidenavChildren.forEach(li => {
    li.addEventListener('click', () => {
        sidenavInst.close();
    });
});

