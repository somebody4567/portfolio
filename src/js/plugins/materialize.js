import 'materialize-css/dist/js/materialize';

const tabs = document.querySelector('.projects__tabs');
M.Tabs.init(tabs);

const scrollSpy = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(scrollSpy);

// sidenav

const sidenav = document.querySelector('.sidenav');
const sidenavChildren = Array.from(sidenav.children);

M.Sidenav.init(sidenav, {
    
});

const sidenavInst = M.Sidenav.getInstance(sidenav);

sidenavChildren.forEach(li => {
    li.addEventListener('click', () => {
        sidenavInst.close();
    });
});

export function returnSuccessToast() {
    return M.toast({html: 'Ваше письмо успешно отправлено!'});
}

export function returnFailureToast() {
    return M.toast({html: 'Произошла непредвиденная ошибка...'});
}

