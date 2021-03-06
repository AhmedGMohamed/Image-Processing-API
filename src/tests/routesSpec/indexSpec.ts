import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

describe("API endpoint suite", (): void => {
  it("Should return a 200 OK status.", async (): Promise<void> => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
  it("Should send a non empty response.", async (): Promise<void> => {
    const response = await request.get("/api");
    expect(response.text).not.toBeFalsy();
  });
});
