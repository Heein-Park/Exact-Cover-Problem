import Cell from '#module/cell';

// Make a class of an independant data structure other than Array.
export default class Matrix {

    #private = {
        genesisCell: undefined,
        cells: [],
    };

    metadata = {
        rows: {
            reference: [],
            get length() {
                return this.reference.length;
            }
        },
        columns: {
            reference: [],
            get length() {
                return this.reference.length;
            }
        }
    }

    // When creating a Matrix object, the constructor needs a nested array
    // The parameter source should be an array, yet it can be empty.
    // If the array 'source' includes both number and array as its element, then behave distinctly.
    constructor(source) {
        if (!Array.isArray(source)) throw new TypeError(`The parameter 'source' is not an array`);
        const safeSource = [...source];

        let previousRow = undefined;

        for (const row of safeSource) {
            if (Array.isArray(row)) {
                let previousCell = undefined;
                let _previousRow = [];
                let pointer = 0;

                while (row.length > 0) {
                    const _value = row.shift();
                    const cell = new Cell(_value);

                    _previousRow.push(cell);
                    this.#private.cells.push(cell);

                    if (!this.#private.genesisCell)
                        this.#private.genesisCell = cell;

                    if (previousCell)
                        previousCell.left = cell;

                    if (previousRow && previousRow.length > 0 && previousRow[pointer])
                        previousRow[pointer].bottom = cell;


                    pointer++;
                    previousCell = cell;
                }
                previousRow = _previousRow;
            }
        }

        // Make referential indexes for column and row
        const columnReference = this.metadata.columns.reference;
        let columnIndex = this.#private.genesisCell;

        while (columnIndex) {
            columnReference.push(columnIndex)
            columnIndex = columnIndex.left;
        }

        const rowReference = this.metadata.rows.reference;
        let rowIndex = this.#private.genesisCell;

        while (rowIndex) {
            rowReference.push(rowIndex)
            rowIndex = rowIndex.bottom;
        }
    }

    getRowArray(rowNumber) {
        if (rowNumber > this.metadata.rows.length - 1)
            throw new RangeError('The number of a row you insert is out of a range')

        const rowReference = this.metadata.rows.reference;
        const initialCell = rowReference[rowNumber];

        const result = [];
        let cell = initialCell;
        while (cell) {
            result.push(cell);
            cell = cell.left
        }
        
        return result;
    }

    get genesisCell() { return this.#private.genesisCell }
}