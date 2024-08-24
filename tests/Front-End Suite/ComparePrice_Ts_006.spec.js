import { test } from '@playwright/test';

import { amazonBaseUrl, flipkartBaseUrl, flipkartProduct,  amazonProduct } from '../../Utils/link';

import { searchBarData } from '../../Utils/constants';

import {comparePrices} from '../../Utils/helper'

test('comparing prices between amazon and flipkart', {tag : '@positive'}, async({page})=>{

    await page.goto(amazonBaseUrl);

    const searchBar = page.getByPlaceholder('Search Amazon.in');

    await searchBar.fill(searchBarData);

    const SearchIcon = page.getByRole('button', { name: 'Go', exact: true });

    await SearchIcon.click();

    const priceOfAmazon = await page.locator('div.a-row span.a-price span[aria-hidden="true"] span.a-price-whole').nth(0).textContent();

    console.log("price on amazon is :" + priceOfAmazon);

    await page.goto(flipkartBaseUrl);

    const flipkartSearchBar = page.getByPlaceholder('Search for Products, Brands');

    await flipkartSearchBar.click();

    await flipkartSearchBar.fill(searchBarData);

    await page.getByPlaceholder('Search for Products, Brands').press('Enter');

    const priceOfFlipkart = await page.locator('.Nx9bqj').nth(0).textContent();

    console.log("price on flipkart is :" + priceOfFlipkart);

    console.log(comparePrices(priceOfAmazon, priceOfFlipkart));
})

test('comparing prices for the same product on flipkart and amazon',{tag : '@positive'}, async({page})=>{

    await page.goto(amazonProduct);

    const priceOnAmazon = await page.locator('span[data-a-size=xl] span[aria-hidden=true] span.a-price-whole').nth(0).textContent();

    console.log("price of product on amazon is : " + priceOnAmazon);

    await page.goto(flipkartProduct);

    const priceOnFlipkart = await page.locator('.Nx9bqj.CxhGGd').textContent();

    console.log("Price of product on flipkart is :" + priceOnFlipkart);

    console.log(comparePrices(priceOnAmazon,priceOnFlipkart));

})