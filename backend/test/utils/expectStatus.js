// validating status responses in 200
function expectStatusResponseToBe200(response) {
    expect(response.statusCode).toBe(200)
}

function expectStatusResponseToBe400(response) {
    expect(response.statusCode).toBe(400)
}

module.exports = {
    expectStatusResponseToBe200,
    expectStatusResponseToBe400
};