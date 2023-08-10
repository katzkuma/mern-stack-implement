const server = require('../server')
const request = require('supertest')(server)
const { expectJsonResponse } = require('./utils/expectJson');
const { 
    expectStatusResponseToBe200, 
    expectStatusResponseToBe400,
    expectStatusResponseToBe404
 } = require('./utils/expectStatus');

describe('GET /workouts/:id', () => {

    describe('get a single workout', () => {

        test('should respond with a 200 status code ', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0]
            const response = await request.get("/api/workouts/"+ firstWorkout._id);

            expectStatusResponseToBe200(response)
        });
        
        test('should specify json in the content type header ', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0];
            const response = await request.get("/api/workouts/"+ firstWorkout._id);

            expectJsonResponse(response)
        });

        test('should get correct workouts data ', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0];
            const response = await request.get("/api/workouts/"+ firstWorkout._id);

            expect(response.body).toBeDefined()
        });
        // should respond with a json object
    });

    describe('When id is not matched to any workout', () => {
        test('should respond with a 404 status code ', async () => {
            const response = await request.get("/api/workouts/9999999999");

            expectStatusResponseToBe404(response)
        });
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

            expect(response.body).toBeDefined()
        });
    });
});

describe('POST /workouts', () => {
    describe('POST a new workout', () => {
        test('should respond with a 200 status code ', async () => {
            const response = await request.post("/api/workouts").send({
                title: "Squat",
                load: "50",
                reps: "10"
            });
            expectStatusResponseToBe200(response)
        });
        
        test('should specify json in the content type header ', async () => {
            const response = await request.post("/api/workouts");
            expectJsonResponse(response)
        });
    });

    describe('When params is missing', () => {
        test('should respond with a 400 status code', async () => {
            const bodyData = [
                {title: "Squat"},
                {load: 50},
                {reps: 10},
                {},
            ]

            for (const body of bodyData) {
                const response = await request.post("/api/workouts").send(body);
                expectStatusResponseToBe400(response)
            }
        });
    });
});

describe('DELETE /workout/:id', () => {
    describe('delete a workout', () => {
        test('should respond with a 200 status code and return a json', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0];
            const response = await request.delete("/api/workouts/" + firstWorkout._id)

            expectStatusResponseToBe200(response)
            expectJsonResponse(response)
        });
    });

    describe('when id is not matched', () => {
        test('should respond with a 404 status code ', async () => {
            const response = await request.delete("/api/workouts/9999999999");

            expectStatusResponseToBe404(response)
        });
    });
});

describe('UPDATE /workout/:id', () => {
    describe('update a workout', () => {
        test('should respond with a 200 status code and return a json', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0];
            const response = await request.patch("/api/workouts/" + firstWorkout._id)

            expectStatusResponseToBe200(response)
            expectJsonResponse(response)
        });
    });

    describe('update a workout', () => {
        test('should respond with a 200 status code, return a json, update correctly', async () => {
            const firstWorkout = (await request.get("/api/workouts")).body[0];

            // create data for updating
            const updatedData = {
                title: 'Updated Workout Title',
                load: 150,
                reps: 12
            };
    
            const response = await request.patch("/api/workouts/" + firstWorkout._id)
                .send(updatedData); 

            expectStatusResponseToBe200(response)
            expectJsonResponse(response)
    
            // get the same workout to check again
            const updatedWorkout = (await request.get("/api/workouts/" + firstWorkout._id)).body;

            expect(updatedWorkout).toEqual(expect.objectContaining(updatedData));

        });
    });
    

    describe('when id is not matched', () => {
        test('should respond with a 404 status code ', async () => {
            const response = await request.patch("/api/workouts/9999999999");

            expectStatusResponseToBe404(response)
        });
    });
});