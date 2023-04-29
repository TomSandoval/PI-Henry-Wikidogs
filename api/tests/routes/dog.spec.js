/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { createNewDog } = require('../../src/handlers/postDog.js');
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


describe('createNewDog', () => {
  it('should create a new dog with correct parameters', async () => {
    const name = 'Test Dog';
    const minHeight = 20;
    const maxHeight = 50;
    const minWeight = 10;
    const maxWeight = 20;
    const life_span = '10 - 15 years';
    const image = 'https://testimage.com';
    const temperaments = ['Calm', 'Friendly'];

    const result = await createNewDog(name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperaments);
    expect(result).to.equal('Dog successfully created');
  });

  it('should create a new dog with default image when no image is provided', async () => {
    const name = 'Test Dog';
    const minHeight = 20;
    const maxHeight = 50;
    const minWeight = 10;
    const maxWeight = 20;
    const life_span = '10 - 15 years';
    const temperaments = ['Calm', 'Friendly'];

    const result = await createNewDog(name, minHeight, maxHeight, minWeight, maxWeight, life_span, undefined, temperaments);
    expect(result).to.equal('Dog successfully created');
  });
});