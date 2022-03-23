import supertest from "supertest";
import app from "../../../index";

const request = supertest(app);

describe("resize api test suite", () => {
  it("Should return with 200 OK status code", async () => {
    const response = await request.get("/api/resize");
    expect(response.statusCode).toBe(200);
  });
  it("Should send the specified response to the user", async () => {
    const response = await request.get("/api/resize?name=fj&width=500");
    expect(response.text).toBe(
      "Wrong filename given, please Input a valid filename"
    );
  });
  it("Should respond with an image buffer if file name, width & height are provided", async () => {
    const response = await request.get(
      "/api/resize?name=fjord&width=500&height=500"
    );
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should respond with an image buffer if file name and width only are provided", async () => {
    const response = await request.get("/api/resize?name=fjord&width=500");
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should respond with an image buffer if file name and height only are provided", async () => {
    const response = await request.get("/api/resize?name=fjord&height=500");
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should not respond with an image if file name was provided while neither width nor height are specified", async () => {
    const response = await request.get("/api/resize?name=fjord");
    expect(response.body instanceof Buffer).toBe(false);
  });
});
