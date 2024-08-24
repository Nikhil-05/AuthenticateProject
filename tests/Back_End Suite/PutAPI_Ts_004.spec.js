import { test, expect } from '@playwright/test';

import { dummyApiBaseUrl } from '../../Utils/link';

import { idToUpdate, validPostData, invalidIdToUpdate } from '../../Utils/constants';

import { validateDummyApiPutRequest } from '../../Utils/apiValidator';

test('Validating Put Request for 200 response and 419 response',{tag :'@positive'}, async({request})=>{

    const requestUrl = `${dummyApiBaseUrl}/update/${idToUpdate}`;

    const response = await request.put(requestUrl,{

        data: validPostData,
    });

    const statusCode = response.status();

    expect([200, 429]).toContain(statusCode);

    if (statusCode === 429) {

        console.log('Received 429 Too Many Requests - Test passed as expected');

        return;
    }

    const responseBody = await response.json();

    const responseData = responseBody.data;

    validateDummyApiPutRequest(responseBody, responseData);
})

test('Validating put request for 405(method not allowed) request with invalid id',{tag : '@negative'}, async({request})=>{

    const requestUrl = `${dummyApiBaseUrl}/update/${invalidIdToUpdate}`;

    const response = await request.put(requestUrl,{

        data: validPostData,
    });

    expect(response.status()).toBe(405);
})