const server = require('../server')
const request = require('supertest')(server)
const { expectJsonResponse } = require('./utils/expectJson');
const { expectStatusResponseToBe200 } = require('./utils/expectStatus');

describe('GET /workouts/:id', () => {

    describe('get a single workout', () => {

        test('should respond with a 200 status code ', async () => {
            const response = await request.get("/api/workouts/1");
            expectStatusResponseToBe200(response)
        });
        
        test('should specify json in the content type header ', async () => {
            const response = await request.get("/api/workouts/1");
            expectJsonResponse(response)
        });

        test('should get correct workouts data ', async () => {
            const response = await request.get("/api/workouts/1");

            expect(response.body.mssg).toBeDefined()
        });
        // should respond with a json object
    });
});

describe('GET /workouts', () => {
    describe('get all workouts', () => {
        test('should respond with a 200 status code ', async () => {
            const response = await request.get("/api/workouts");
            expectStatusResponseToBe200(response)
        });
        
        test('should specify json in the content type header ', async () => {
            const response = await request.get("/api/workouts");
            expectJsonResponse(response)
        });

        test('should get correct workouts data ', async () => {
            const response = await request.get("/api/workouts");

            expect(response.body.mssg).toBeDefined()
        });
    });
});