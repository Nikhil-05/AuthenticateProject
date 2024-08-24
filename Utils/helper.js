export function generateRandomName() {
    const names = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];

    const randomName = names[Math.floor(Math.random() * names.length)];

    return randomName;
}

export function generateRandomId() {

    return (Math.floor(Math.random() * 1000) + 1).toString();

}

function parsePrice(priceString) {

    const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));

    return numericPrice;

}

export function comparePrices(amazonPrice, flipkartPrice) {
    // Parse the prices
    const amazonParsed = parsePrice(amazonPrice);

    const flipkartParsed = parsePrice(flipkartPrice);

    const priceDifference = Math.abs(amazonParsed - flipkartParsed);


    // Compare and return the lower price
    if (amazonParsed < flipkartParsed) {

        return `Amazon has the lower price: ₹${amazonParsed} and it is : (₹${priceDifference} cheaper)`;
    } else if (flipkartParsed < amazonParsed) {

        return `Flipkart has the lower price: ₹${flipkartParsed} (₹${priceDifference} cheaper)`;

    } else {
        
        return `Both prices are the same: ₹${amazonParsed}`;
    }
}

export async function amazonLogin(page, phoneNumber, password) {
    
  const phoneNumberField = page.locator('input[type="email"]');

  await phoneNumberField.fill(phoneNumber);

  const continueBtn = page.getByLabel('Continue');

  await continueBtn.click();

  const passwordField = page.getByLabel('Password');

  await passwordField.fill(password);

  const signinBtn = page.getByLabel('Sign in');

  await signinBtn.click();
}