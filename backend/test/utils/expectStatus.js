// validating status responses in 200
function expectStatusResponseToBe200(response) {
    expect(response.statusCode).toBe(200)
}

module.exports = {
    expectStatusResponseToBe200
};