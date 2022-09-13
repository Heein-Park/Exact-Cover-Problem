/*
    Create : new Matrix(source)
    Update : Matrix.protoype.write(row, col, value)
*/

class Cell {
    value;
    #private = {
        left : undefined,
        bottom : undefined,
        right : undefined,
        top : undefined
    };

    constructor(value) {
        this.value = value;
        this.#createLinkSetter('left');
    }

    set value(value) { this.value = value }
    get value() { return this.value }

    #createLinkSetter(name) {
        Object.defineProperty(this, name, {
            set(shallowCopy) {
                if(!(shallowCopy instanceof Cell)) throw new TypeError('The parameter is not the instance of Cell.')
                this.#private[`${name}`] = shallowCopy;
            },
            get() {
                return this.#private[`${name}`]
            }
        });
    }
}

// Make a class of an independant data structure other than Array.
class Matrix {
    // When creating a Matrix object, the constructor needs a nested array
    // The parameter source should be an array, yet it can be empty.
    // If the array 'source' includes both number and array as its element, then behave distinctly.
    constructor(source) {
        if (!Array.isArray(source)) throw new TypeError(`The parameter 'source' is not an array`);
        const safeSource = [...source];
        let longestLength = 0;
        for (const row of source) {
            if (Array.isArray(row)) {
                longestLength = row.length > longestLength ? row.length : longestLength
                while (row.length > 0) {
                    row.shift();
                }
            }
        }
    }
}

export { Matrix }