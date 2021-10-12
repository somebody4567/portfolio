import api from '../services/apiServices';
import config from '../config/apiConfig';

class Storage {
    constructor() {
        this.projects = null;
    }

    init() {
        this.projects = api.getRequest();
    }
}

const storage = new Storage();

export default storage;