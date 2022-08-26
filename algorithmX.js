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
tempSubsets.forEach((subset, idx) => {
    console.log(`The ${idx} subset is [${subset}]`);
})

// Create a prototype class for matrix object from a source set and subsets
// Create : new Matrix(source, subsets)
// Read : {
//     Matrix.prototype.readRow(rowNum),
//     Matrix.protoype.readColumn(colNum),
//     Matrix.protoype.read(rowNum, colNum),
// }
// Update : Matrix.protoype.write(rowNum, colNum, value)
// Delete : {
//     Matrix.prototype.deleteRow(rowNum),
//     Matrix.protoype.deleteColumn(colNum),
// }

class Matrix {
    constructor(source, subsets) {
        const dummyArray = new Array(source.length).fill(0);
        this.matrix = [];
        for (const set of subsets) {
            const rowToPush = [...dummyArray];
            for (const element of set) {
                const idx = source.findIndex(srcElement => srcElement === element);
                rowToPush[idx] = 1;
            }
            this.matrix.push(rowToPush);
        }
    }

    read(rowIdx, colIdx) {
        return this.matrix[rowIdx][colIdx];
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

    write(rowIdx, colIdx, value) {
        this.matrix[rowIdx][colIdx] = value;
    }

    deleteRow(rowIdx) {
        this.matrix.splice(rowIdx,1);
    }

    deelteColumn(colIdx) {
        const column = [];
        for (const row of this.matrix) {
            column.push(row[colIdx]);
        }
        return column;
    }
}


const subsetsMatrix = new Matrix(sourceArray, tempSubsets);
console.log(subsetsMatrix.readRow(10));
console.log(subsetsMatrix.readColumn(2));
subsetsMatrix.matrix.forEach(row => {
    console.log(`[${row}]`);
})

// function algorithmX(_matrix) {
//     if (_matrix.length < 1) return;
//     const matrix = [..._matrix];

//     for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
//         const rowArray = matrix[rowIdx];
//         for (let colIdx = 0; colIdx < rowArray.length; colIdx++) {

//         }
//     }
// }

// algorithmX(subsetsMatrix);