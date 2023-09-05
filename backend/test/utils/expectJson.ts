import {describe, expect, test} from '@jest/globals';
import { Response } from 'supertest';

// validating response in json
function expectJsonResponse(response: Response) {
    
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    expect(response.body).toBeInstanceOf(Object);
}

export default expectJsonResponse