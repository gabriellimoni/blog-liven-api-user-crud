import { connect, disconnect } from "../database/index.js";
import request from "supertest";
import server from "../server.js";
import UserModel from "../models/user.js";

describe("User resource", () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await disconnect();
  });

  describe("Create user endpoint", () => {
    beforeEach(async () => {
      await UserModel.deleteMany({});
    });

    test("Should create user successfully", async () => {
      const response = await request(server)
        .post("/user")
        .send({
          name: "Any name",
          email: "any@mail.com",
        })
        .set("Content-Type", "application/json");

      const userFromDatabase = await UserModel.findOne({
        id: response.body.id,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        name: "Any name",
        email: "any@mail.com",
      });
      expect(response.body).toMatchObject({
        id: userFromDatabase.id,
        name: userFromDatabase.name,
        email: userFromDatabase.email,
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
    test("Should return error if name not sent", async () => {
      const response = await request(server)
        .post("/user")
        .send({
          email: "any@mail.com",
        })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toBe(400);
    });
  });
});
