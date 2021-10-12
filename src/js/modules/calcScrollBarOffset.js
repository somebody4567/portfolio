class CalcScrollBarOffset {
    constructor() {}

    init() {
        const elem = document.createElement('div');
        elem.style.cssText = `
            width: 50px;
            height: 50px;
            overflow-y: scroll;
        `;
        document.body.append(elem);
        const scroll = elem.offsetWidth - elem.clientWidth;
        elem.remove();
        return `${scroll}px`;
    }
}

const calcScrollBarOffset = new CalcScrollBarOffset();

export default calcScrollBarOffset;