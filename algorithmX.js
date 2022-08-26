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
const subsets = subArrays(sourceArray, 1, sourceArray.length);
knuthShuffle(subsets);
subsets.splice(0, subsets.length / 2);
subsets.forEach((subset, idx) => {
    console.log(`The ${idx} subset is [${subset}]`);
})

const generateMatrix = (source, _subsets) => {
    const dummyArray = new Array(source.length).fill(0);
    const matrix = [];
    for (const set of _subsets) {
        const arrToPush = [...dummyArray];
        for (const element of set) {
            const idx = source.findIndex(srcElement => srcElement === element);
            arrToPush[idx] = 1;
        }
        matrix.push(arrToPush);
    }
    return matrix;
}
const subsetsMatrix = generateMatrix(sourceArray, subsets);
subsetsMatrix.forEach(row => {
    console.log(`[${row}]`);
})

function algorithmX(_matrix) {
    if (_matrix.length < 1) return;
    const tempMat = [..._matrix]
    const columnsNumber = tempMat[0].length
    const columns = new Array(columnsNumber).fill([]).map(dummy => dummy.slice(0));

    _matrix.forEach(row => {
        for (let i = 0; i < row.length; i++) {
            columns[i].push(row[i]);
        }
    })
    console.log(columns);

    const oneCounts = columns.map((col, idx) => {
        return {
            index: idx,
            counts: col.reduce((counter, current) => {
                if (current === 1) counter++;
                return counter;
            }, 0)
        }
    })
    oneCounts.sort((a, b) => (a.counts > b.counts) ? 1 : -1);
    console.log(oneCounts);

    for (const object of oneCounts) {
        const idx = object.index;
        const col = columns[idx];

        for (const row of tempMat) {
            row.splice(idx, 1)
        }

        const deletionCount = 0;
        for (let j = 0; j < col.length; j++) {
            const isOne = col[j] > 0;
            if (isOne) {
                tempMat.splice(j - deletionCount, 1)
            }
        }

        tempMat.forEach(row => {
            console.log(`[${row}]`);
        })
    }
}

algorithmX(subsetsMatrix);