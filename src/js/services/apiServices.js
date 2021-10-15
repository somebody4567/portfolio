import config from '../config/apiConfig';
import {returnSuccessToast, returnFailureToast} from '../plugins/materialize';
class Api {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.submitBtn = document.querySelector('.contact__form-btn');
        this.axios = require('axios').default;
    }

    async getRequest() {
        return await this.axios(config.urlGet);
    }

    async postMessageToEmail(form) {
        fetch('smart.php', {
            method: "POST",
            body: new FormData(form)
        })
        .then(() => returnSuccessToast())
        .catch(() => returnFailureToast())
        .finally(() => {
            form.reset();
            this.submitBtn.innerHTML = `Отправить
             <i class="material-icons right">send</i> 
            `;
        });
    }

    async onSubmit() {
        this.forms.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                this.submitBtn.innerHTML = config.getSpinnerHTML();
                this.postMessageToEmail(form);
            });
        });
    }
}

const api = new Api();

export default api;