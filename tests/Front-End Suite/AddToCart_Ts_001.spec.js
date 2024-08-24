// @ts-check
import { expect, test } from '@playwright/test';

import { amazonBaseUrl, amazonProduct } from '../../Utils/link';

import { searchBarData, phoneNumberData, passwordData, invalidCouponCode } from '../../Utils/constants';

import { amazonLogin, comparePrices } from '../../Utils/helper';


test.beforeEach(async({page})=>{

  await page.goto(amazonBaseUrl);

})

test('Add to Cart and capture details of product', {tag:'@positive'}, async({page})=>{

  const searchBar = page.getByPlaceholder('Search Amazon.in');

  await searchBar.fill(searchBarData);

  const SearchIcon = page.getByRole('button', { name: 'Go', exact: true });

  await SearchIcon.click();

  const page1Promise = page.waitForEvent('popup');

  const amazonChoiceWatch = page.locator('.s-image').nth(0);

  await amazonChoiceWatch.click();

  const page1 = await page1Promise;

  const productLink = page1.url();

  console.log("link of the product is :" + productLink);

  const nameOfProduct = await page1.locator('id=productTitle').textContent();

  console.log("name of product is :" + nameOfProduct);

  const priceOfProduct = await page1.locator('span.reinventPricePriceToPayMargin span[aria-hidden=true] span.a-price-whole').textContent();

  console.log("price of the product is :" +  priceOfProduct);

  const addToCartBtn = page1.locator('#add-to-cart-button');

  await addToCartBtn.click();

  page1.pause();

  const goToCartBtn = page1.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' });

  await goToCartBtn.click();

  const proceedToBuyBtn = page1.getByLabel('Proceed to Buy Buy Amazon');

  await proceedToBuyBtn.click();
})


test('Cliking on search button without entering any data', {tag: '@negative'}, async({page})=>{

  const SearchIcon = page.getByRole('button', { name: 'Go', exact: true });

  await SearchIcon.click();

  expect(page.url()).toBe(amazonBaseUrl);

});

test('Applying a Invalid coupon code on payment page',{tag : '@negative'}, async({page})=>{

  test.setTimeout(120000);

  await page.goto(amazonProduct);

  const buyNowBtn = page.getByLabel('Buy Now');

  await buyNowBtn.click();

  const phoneNumberField = page.locator('input[type="email"]');

  await phoneNumberField.fill(phoneNumberData);

  const continueBtn = page.getByLabel('Continue');

  await continueBtn.click();

  const passwordField = page.getByLabel('Password');

  await passwordField.fill(passwordData);

  const signinBtn = page.getByLabel('Sign in');

  await signinBtn.click();

  const useThisPaymentMethodBtn = page.locator('#orderSummaryPrimaryActionBtn').getByLabel('Use this payment method');

  await useThisPaymentMethodBtn.click();

  const couponField = page.getByPlaceholder('Enter Code');

  await couponField.click();

  await couponField.fill(invalidCouponCode);

  const applyBtn = page.getByLabel('Apply');

  await applyBtn.click();

  const warning  = page.getByText('A promotional code is');

  await page.waitForLoadState('networkidle');

  expect(warning).toBeVisible();
})

test('Comparing price on product page and Payment page', {tag:'@positive'}, async({page})=>{

  test.setTimeout(120000);

  await page.goto(amazonProduct);

  const priceOnAmazon = await page.locator('span[data-a-size=xl] span[aria-hidden=true] span.a-price-whole').nth(0).textContent();

  console.log("price on product page is : " + priceOnAmazon);

  const buyNowBtn = page.getByLabel('Buy Now');

  await buyNowBtn.click();

  await amazonLogin(page,phoneNumberData, passwordData);

  const useThisPaymentMethodBtn = page.locator('#orderSummaryPrimaryActionBtn').getByLabel('Use this payment method');

  await useThisPaymentMethodBtn.click();

  await page.waitForLoadState('networkidle');

  const priceOnPaymentPage = await page.locator('td.grand-total-price').textContent();

  console.log("price on payment page" + priceOnPaymentPage);

  console.log(comparePrices(priceOnAmazon, priceOnPaymentPage));
})

