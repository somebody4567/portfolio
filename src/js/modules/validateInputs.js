class ValidateInputs {
    constructor() {
        this.inputs = document.querySelectorAll('.contact__form-input');
        this.errorCount = 0;
        this.form = document.querySelector('.contact__form');
        this.re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    }

    init() {
        this.errorCount = 0;
        
        this.inputs.forEach(item => {
            
            item.classList.remove('_error');
            
            if (item.name == 'email') {
                if (!item.value.match(this.re)) {
                    this.errorCount++;
                    item.classList.add('_error');
                } else {
                    item.classList.remove('_error');
                }
            } else {
                if (item.value.length == 0) {
                    this.errorCount++;
                    item.classList.add('_error');
                } else {
                    item.classList.remove('_error');
                }
            }

            if (item.classList.contains('_error')) {
                item.style.borderColor = `red`;
                item.previousElementSibling.classList.remove('white-text');
                item.previousElementSibling.classList.add('red-text');
                item.nextElementSibling.classList.remove('white-text');
                item.nextElementSibling.classList.add('red-text');
                item.style.boxShadow = 'none';
            }
        });
    }

    removeStylesFromInputs() {
        ['input', 'focus'].forEach(e => {
            this.inputs.forEach(input => {
                input.addEventListener(e, () => {
                    input.style.borderColor = ``;
                    input.previousElementSibling.classList.remove('red-text');
                    input.previousElementSibling.classList.add('white-text');
                    input.nextElementSibling.classList.remove('red-text');
                    input.nextElementSibling.classList.add('white-text');
                });
            });
        });
    }

    get errors() {
        return this.errorCount;
    }
}

const validateInputs = new ValidateInputs();

export default validateInputs;