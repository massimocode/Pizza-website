import { DiscountCalculationDto, DiscountRule } from './interfaces';
import { flatten, getBasePrices, sortByPrice, sum } from './helpers';

export const familyDealExtraLarge: DiscountRule = {
    name: 'Family Deal - Extra Large',
    description: 'Any 3 x Extra Large pizzas and either a portion of Cheesy Chips or a Bottle of Drink or a portion of Garlic Bread for £33.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Extra Large', 33.99);
    }
}

export const familyDealLarge: DiscountRule = {
    name: 'Family Deal - Large',
    description: 'Any 3 x Large pizzas and either a portion of Cheesy Chips or a Bottle of Drink or a portion of Garlic Bread for £28.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Large', 28.99);
    }
}

export const familyDealMedium: DiscountRule = {
    name: 'Family Deal - Medium',
    description: 'Any 3 x Medium pizzas and a portion of Cheesy Chips or a Bottle of Drink or a portion of Garlic Bread for £24.99',
    calculate(basket: DiscountCalculationDto) {
        return calculate(basket, 'Medium', 24.99);
    }
}

function calculate(basket: DiscountCalculationDto, pizzaSize: string, bundlePrice: number) {
    let pizzas = sortByPrice(flatten(getBasePrices(basket.items.filter(x => x.tags.indexOf('pizza') !== -1 && x.version === pizzaSize))));
    let additionalItem = sortByPrice(flatten(basket.items.filter(x =>
        (["Cheesy chips", "Garlic Bread"].indexOf(x.name) !== -1) ||
        x.tags.indexOf('bottle') !== -1
    )));
    let timesToApply = Math.min(Math.floor(pizzas.length / 3), Math.floor(additionalItem.length));
    return sum(pizzas.slice(0, timesToApply * 3)) + sum(additionalItem.slice(0, timesToApply)) - (timesToApply * bundlePrice);
}
