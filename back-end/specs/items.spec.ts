import { expect } from 'chai';
import * as rp from 'request-promise';
import catalogue from '../static-data/catalogue';

describe('Fetch items', function () {
    this.timeout(20000);

    it('Should fetch the pizzas as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/pizzas', { json: true });
        expect(json).to.deep.equal(catalogue.pizzas);
    });

    it('Should fetch the drinks as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/drinks', { json: true });
        expect(json).to.deep.equal(catalogue.drinks);
    });

    it('Should fetch the sides as expected', async () => {
        let json = await rp.get('http://localhost:3000/api/items/sides', { json: true });
        expect(json).to.deep.equal(catalogue.sides);
    });
});