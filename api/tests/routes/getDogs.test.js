const { expect } = require('chai');
const { getDogs } = require('../../src/handlers/getAllDogs');

describe('getDogs', () => {
  it('returns all dogs if no name is provided', async () => {
    const result = await getDogs();
    expect(result).to.be.an('array');
  });

  it('returns a dog if a valid name is provided', async () => {
    const result = await getDogs('bulldog');
    expect(result).to.be.an('array');
    expect(result.length).to.be.above(0);
  });

  it('throws an error if an invalid name is provided', async () => {
    try {
      const result = await getDogs('invalid-name');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Dog not found');
    }
  });
});