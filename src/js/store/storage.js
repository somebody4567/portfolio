import api from '../services/apiServices';
import config from '../config/apiConfig';

class Storage {
    constructor() {
        this.countries = null;
    }

    init() {
    }
}

const storage = new Storage();

export default storage;