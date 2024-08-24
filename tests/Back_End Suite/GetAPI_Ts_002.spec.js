import { test, expect } from '@playwright/test';

import { genderizeApiBaseUrl } from '../../Utils/link';

import { maleName, femaleName, invalidNumberName, invalidSpecialCharacterName } from '../../Utils/constants';

import { validateJsonResponseGenderize } from '../../Utils/apiValidator';


test('Validating API Response For Male Name', {tag: '@positive'}, async({request})=>{

    const response = await request.get(`${genderizeApiBaseUrl}?name=${maleName}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    validateJsonResponseGenderize(responseBody);

    expect(responseBody.name).toBe(maleName);

    expect(responseBody.gender).toBe('male');
})


test('validating api response for female name', {tag: '@positive'}, async({request})=>{

    const response = await request.get(`${genderizeApiBaseUrl}?name=${femaleName}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    validateJsonResponseGenderize(responseBody);

    expect(responseBody.name).toBe(femaleName);

    expect(responseBody.gender).toBe('female');
})


test('validating api response for invalid name with numbers', {tag: '@negative'}, async({request})=>{

    const response = await request.get(`${genderizeApiBaseUrl}?name=${invalidNumberName}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    validateJsonResponseGenderize(responseBody);

    expect(responseBody.name).toBe(invalidNumberName);

    expect(responseBody.gender).toBe(null);
})

test('validating api response for invalid name with special characters', {tag: '@negative'}, async({request})=>{

    const response = await request.get(`${genderizeApiBaseUrl}?name=${invalidSpecialCharacterName}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    validateJsonResponseGenderize(responseBody);

    expect(responseBody.name).toBe(invalidSpecialCharacterName);

    expect(responseBody.gender).toBe(null);
})