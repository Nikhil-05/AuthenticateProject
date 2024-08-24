import { test, expect } from '@playwright/test';

import { dummyApiBaseUrl } from '../../Utils/link';

import { validPostData } from '../../Utils/constants'

import { validateDummyApiPostRequest } from '../../Utils/apiValidator'

test('Validating Post Request for success response(200) and 419 for too many requests', {tag: '@positive'}, async({request})=>{

    const requestUrl = `${dummyApiBaseUrl}/create`;

    const response = await request.post(requestUrl,{

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

    validateDummyApiPostRequest(responseBody, responseData);

})
