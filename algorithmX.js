// Reduce the derived problems into the fundamental exact cover problem
// Apply the Knuth Algorithm X Solution
// Due to its NP-completeness, any problem in NP can be reduced to exact cover problems,
// which then can be solved with techniques such as Dancing Links. 

// https://en.wikipedia.org/wiki/Knuth%27s_Algorithm_X
// Consider the exact cover problem specified by the universe U = {1, 2, 3, 4, 5, 6, 7} and the collection of sets S = {A, B, C, D, E, F}

const { subArrays } = require("sub-arrays-js");
const { knuthShuffle } = require("knuth-shuffle");

const sourceArray = new Array(10).fill(0).map((element, idx) => idx);
console.log(`The source array contains randomly generated numbers : ${sourceArray}`);
const tempSubsets = subArrays(sourceArray, 1, sourceArray.length);
knuthShuffle(tempSubsets);
tempSubsets.splice(0, tempSubsets.length / 2);
console.table(tempSubsets);

// Create a prototype class for matrix object from a source set and subsets
// Create : new Matrix(source, subsets)
// Read : {
//     Matrix.prototype.readRow(rowNum),
//     Matrix.protoype.readColumn(colNum),
// }
// Update : Matrix.protoype.write(rowNum, colNum, value)
// Delete : {
//     Matrix.prototype.deleteRow(rowNum),
//     Matrix.protoype.deleteColumn(colNum),
// }

class Matrix {
    matrix = [];

    constructor(source, subsets) {
        const dummyArray = new Array(source.length).fill(0);

        for (const set of subsets) {
            const rowToPush = [...dummyArray];
            for (const element of set) {
                const idx = source.findIndex(srcElement => srcElement === element);
                rowToPush[idx] = 1;
            }
            this.matrix.push(rowToPush);
        }

        this.readRow = this.readRow.bind(this);
        this.readColumn = this.readColumn.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
    }

    readRow(rowIdx) {
        return this.matrix[rowIdx];
    }

    readColumn(colIdx) {
        const column = [];
        for (const row of this.matrix) {
            column.push(row[colIdx])
        }
        return column;
    }

    get rows() {
        return this.matrix;
    }

    get columns() {
        const columns = [];
        let idx = 0;
        while (true) {
            const single = this.readColumn(idx);
            if (single.every(element => element !== undefined)) {
                columns.push(single);
            } else break;
            idx++;
        }
        return columns;
    }

    write(rowIdx, colIdx, value) {
        this.matrix[rowIdx][colIdx] = value;
    }

    deleteRow(rowIdx) {
        this.matrix.splice(rowIdx, 1);
    }

    deleteColumn(colIdx) {
        for (const row of this.matrix) {
            row.splice(colIdx, 1);
        }
    }
}

const subsetsMatrix = new Matrix(sourceArray, tempSubsets);
console.table(subsetsMatrix.rows);

function algorithmX(_Matrix) {
    if (_Matrix.rows.length < 1) {
        console.table(_Matrix.rows);
        return false;
    }
    let rows = function () {return _Matrix.rows};
    let columns = function () {return _Matrix.columns};

    let callCount = 0;
    while(callCount <= 1000) {
        const oneCountTable = function () {
            const table = columns().map((col, idx) => {
                return {
                    index: idx,
                    counts: col.reduce((counter, current) => {
                        if (current === 1) counter++;
                        return counter;
                    }, 0)
                }
            })
            table.sort((a, b) => (a.counts > b.counts) ? 1 : -1);
            return table;
        }();

        if(oneCountTable.length < 1) break;

        const colIdx = oneCountTable[0].index;

        for(let rowIdx = 0; rowIdx < rows().length; rowIdx++) {
            if(rows()[rowIdx][colIdx] === 1) {
                _Matrix.deleteRow(rowIdx);
            }
        }
        _Matrix.deleteColumn(colIdx);

        console.table(oneCountTable);
        console.table(rows());
        console.log(columns().length);

        callCount++;
    } 
}

algorithmX(subsetsMatrix);