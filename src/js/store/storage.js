import api from '../services/apiServices';
import config from '../config/apiConfig';

class Storage {
    constructor() {
        this.countries = null;
    }

    init() {
        api.getRequest().then(res => {
            console.log(res.data);
        });
    }
}

const storage = new Storage();

export default storage;