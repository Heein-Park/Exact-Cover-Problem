export default class Cell {
    value;
    #private = {
        left: undefined,
        bottom: undefined,
    };

    constructor(value) {
        this.value = value;
        for (const [key, value] in this.#private) {
            this.#createLinkSetter(key);
        }
    }

    set value(value) { this.value = value }
    get value() { return this.value }

    #createLinkSetter(name) {
        Object.defineProperty(this, name, {
            set(shallowCopy) {
                if (!(shallowCopy instanceof Cell)) throw new TypeError('The parameter is not the instance of Cell.')
                this.#private[`${name}`] = shallowCopy;
            },
            get() {
                return this.#private[`${name}`]
            }
        });
    }
}