const expect = require('chai').expect;
const fetch = require('node-fetch');

describe('Fetch Pizza from MongoDB', function() {
    this.timeout(10000)

    it('Should fetch the items as expected', (done) => {
        fetch('http://localhost:3000/api/pizzas')
            .then(res => res.json())
            .then(json => {
                expect(json).to.deep.equal([{
                        _id: '58488a9cf36d283e14c2ec61',
                        name: 'Neapolitan Pizza',
                        description: 'Features tomatoes, garlic, oregano, and extra virgin olive oil.',
                        imageName: 'images/pizzas/neapolitan-pizza.jpg',
                        subType: ['large', 'medium', 'small'],
                        price: {
                            "large": 16.99,
                            "medium": 14.99,
                            "small": 12.99
                        }
                    },
                    {
                        _id: '58488b73f36d283e14c2ecb3',
                        name: 'Sicilian Pizza',
                        description: 'Topped with a tomato sauce, onions, herbs, anchovies, and then covered with bread crumbs.',
                        imageName: 'images/pizzas/sicilian-pizza.jpg',
                        subType: ['large', 'medium', 'small'],
                        price: {
                            "large": 16.99,
                            "medium": 14.99,
                            "small": 12.99
                        }
                    },
                    {
                        _id: '58488c55f36d283e14c2edc6',
                        name: 'Mushroom pizza',
                        description: 'Mushroom pizza with onion and olives oil.',
                        imageName: 'images/pizzas/mushrooms-pizza.jpg',
                        subType: ['large', 'medium', 'small'],
                        price: {
                            "large": 16.8,
                            "medium": 14.8,
                            "small": 11.99
                        }
                    }
                ])
            }).then(done)
    });
});