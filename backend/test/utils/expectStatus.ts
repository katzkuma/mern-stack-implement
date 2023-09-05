import { expect } from '@jest/globals';
import { Response } from 'supertest';

// validating status responses in 200
export function expectStatusResponseToBe200(response: Response): void {
    expect(response.statusCode).toBe(200)
}

export function expectStatusResponseToBe400(response: Response): void {
    expect(response.statusCode).toBe(400)
}

export function expectStatusResponseToBe404(response: Response): void {
    expect(response.statusCode).toBe(404)
}