import Cell from '../module/cell.js';
import { assert, expect } from 'chai';

describe('Cell Unit Test', function () {
    const cell = new Cell(10);
    console.dir(cell);
    it('Create a cell object from Class Cell', () => expect(cell).to.be.ok)

    it('The cell object has its properties', () => {
        expect(cell).to.have.property('value');
        expect(cell.value).to.equal(10);
    })

    it('The cell object can link to another cell', () => {
        const next = new Cell(15);
        expect(next).to.have.property('value');
        expect(next.value).to.equal(15);

        cell.left = next;
        expect(cell).to.have.property('left');
        expect(cell.left).to.equal(next).and.to.include({value : 15});
        console.dir(cell);
    })
})
