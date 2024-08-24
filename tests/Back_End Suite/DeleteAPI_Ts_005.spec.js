import { test, expect } from '@playwright/test';

import { dummyApiBaseUrl } from '../../Utils/link';

import { idToDelete } from '../../Utils/constants';

import { validateDummyApiDeleteRequest } from '../../Utils/apiValidator'


test('Validating success response from delete API', {tag : '@positive'}, async({request})=>{

    const requestUrl = `${dummyApiBaseUrl}/delete/${idToDelete}`;

    const response = await request.delete(requestUrl);

    const statusCode = response.status();

    expect([200, 429]).toContain(statusCode);

    if (statusCode === 429) {

        console.log('Received 429 Too Many Requests - Test passed as expected');

        return;
    }

    const responseBody = await response.json();

    validateDummyApiDeleteRequest(responseBody);
})

test('validating delete request without id', {tag : '@negative'}, async({request})=>{

    const requestUrl = `${dummyApiBaseUrl}/delete/`;

    const response = await request.delete(requestUrl);

    const statusCode = response.status();

    expect(response.status()).toBe(405);

})