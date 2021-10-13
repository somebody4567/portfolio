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
