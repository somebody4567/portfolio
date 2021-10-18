import config from '../config/apiConfig';
import {returnSuccessToast, returnFailureToast, returnFormToast} from '../plugins/materialize';
import validateInputs from '../modules/validateInputs';
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
        .then(res => {
            if (res.ok) {
                returnSuccessToast();
            } else {
                returnFailureToast();
            }
        })
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
                validateInputs.init();
                if (validateInputs.errors == 0) {
                    this.submitBtn.innerHTML = config.getSpinnerHTML();
                    this.postMessageToEmail(form);
                } else {
                    returnFormToast();
                }
            });
        });
    }
}

const api = new Api();

export default api;