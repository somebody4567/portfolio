import config from '../config/apiConfig';

// const axios = require('axios').default;

class Api {
    constructor() {
        this.axios = require('axios');
    }

    async getRequest() {
        return await this.axios('http://localhost:3000/projects');
    }
}

const api = new Api();

export default api;