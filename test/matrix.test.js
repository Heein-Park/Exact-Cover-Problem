import Matrix from '#module/matrix';
import { assert, expect } from 'chai';

describe('Matrix Unit Test', function () {
    const matrix = new Matrix([[1,2,3],[4,5,6]]);
    console.table(matrix.metadata);
    it('Create a matrix object from Class Matrix', () => expect(matrix).to.be.ok);
    it('Check the integrity of the matrix object', () => {
        assert.isObject(matrix.metadata, `Metadata doesn't exists`);
        assert.isArray(matrix.getRowArray(0), "Function getRowArray is not working");
    });

})
