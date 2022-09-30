import request from "supertest";
import server from "../server.js";

describe("Create user endpoint", () => {
  test("Should create user successfully", async () => {
    const response = await request(server)
      .post("/user")
      .send({
        name: "Any name",
        email: "any@mail.com",
      })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe({
      id: expect.any(String),
      name: "Any name",
      email: "anyWmail.com",
    });
  });

  test("Should return error if email not sent", async () => {
    const response = await request(server)
      .post("/user")
      .send({
        name: "Any name",
      })
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(400);
  });
});
