class FilterCards {
    constructor() {
        this.cards = Array.from(document.querySelectorAll('.projects__wrapper-item'));
        this.tabs = document.querySelectorAll('.projects__tabs .tab');
    }

    init() {
        this.tabs.forEach(item => {
            item.addEventListener('click', () => {
                const whatToShow = item.getAttribute('data-type');
                this.cards.filter(card => {
                    if (card.classList.contains(whatToShow)) {
                        card.style.display = 'block';
                        card.classList.add('fadeIn');
                        card.addEventListener('animationend', e => (e.animationName == 'fadeIn') ? card.classList.remove('fadeIn') : '');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fadeIn');
                    }
                });
            });
        });
    }
}

const filterCards = new FilterCards();

export default filterCards;