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

export { Matrix }