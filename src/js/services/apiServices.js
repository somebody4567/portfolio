import config from '../config/apiConfig';
class Api {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.axios = require('axios');
    }

    async getRequest() {
        return await this.axios(config.urlGet);
    }

    async postMessageToEmail(form) {
        const formData = new FormData(form);

        fetch(config.urlPost, {
            method: "POST",
            body: formData
        })
        .then(data => console.log(data))
        .catch()
        .finally(() => form.reset());

    }

    async onSubmit() {
        this.forms.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                this.postMessageToEmail(form);
            });
        });
    }
}

const api = new Api();

export default api;