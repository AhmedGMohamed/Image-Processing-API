import supertest from "supertest";
import app from "../index";

const request = supertest(app);

//tests to check the main functionality of the app
describe("Main server test suite", () => {
  it("Should return a 200 OK status", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
  it("Should send response message", async () => {
    const response = await request.get("/");
    expect(response.text).toBe("Main page visited");
  });
  it("Should respond with a 404 not found status", async () => {
    const response = await request.get("/non-existent-api");
    expect(response.status).toBe(404);
  });
});
