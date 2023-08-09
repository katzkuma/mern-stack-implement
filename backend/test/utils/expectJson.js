// validating response in json
function expectJsonResponse(response) {
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    expect(response.body).toBeInstanceOf(Object);
}

module.exports = {
    expectJsonResponse
};