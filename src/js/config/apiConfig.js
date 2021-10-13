class Config {
    constructor() {
        this.urlGet = 'http://localhost:3000/projects';
        this.urlPost = 'mailer/smart.php';
    }

    testWebP(callback) {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
}

const config = new Config();

export default config;
