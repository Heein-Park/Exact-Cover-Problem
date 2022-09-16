

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