import supertest from "supertest";
import app from "../../../index";

const request = supertest(app);

describe("Resize API test suite", (): void => {
  it("Should return with 400 Invalid parameters status code.", async (): Promise<void> => {
    const response = await request.get("/api/resize");
    expect(response.statusCode).toBe(400);
  });
  it("Should send the specified response to the user.", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fj&width=500");
    expect(response.text).toBe(
      "Wrong filename given, please Input a valid filename using (name={fileName})" +
        " where {fileName} is the name of your file without the extension"
    );
  });
  it("Should respond with an image buffer if file name, width & height are provided.", async (): Promise<void> => {
    const response = await request.get(
      "/api/resize?name=fjord&width=500&height=500"
    );
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should respond with an image buffer if file name and width only are provided.", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fjord&width=500");
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should respond with an image buffer if file name and height only are provided.", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fjord&height=500");
    expect(response.body instanceof Buffer).toBe(true);
  });
  it("Should not respond with an image if file name was provided while neither width nor height are specified.", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fjord");
    expect(response.body instanceof Buffer).toBe(false);
  });
  it("Should respond with 400 invalid parameters status code if supplied with anything other than a number in width", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fjord&width=a");
    expect(response.statusCode).toBe(400);
  });
  it("Should respond with 400 invalid parameters status code if supplied with anything other than a number in height", async (): Promise<void> => {
    const response = await request.get("/api/resize?name=fjord&height=a");
    expect(response.statusCode).toBe(400);
  });
});
