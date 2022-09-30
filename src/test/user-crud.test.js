import { connect, disconnect } from "../database/index.js";
import request from "supertest";
import server from "../server.js";
import UserModel from "../models/user.js";

describe("User resource", () => {
  beforeAll(async () => {
    await connect();
  });
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });
  afterAll(async () => {
    await disconnect();
  });

  describe("Create user endpoint", () => {
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

  describe("List user endpoint", () => {
    test("Should list users successfully", async () => {
      await UserModel.create({
        name: "Any name",
        email: "any@mail.com",
      });

      const response = await request(server).get("/user");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        id: expect.any(String),
        name: "Any name",
        email: "any@mail.com",
      });
    });
    test("Should return empty", async () => {
      const response = await request(server).get("/user");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });

  describe("Get user endpoint", () => {
    test("Should get user successfully", async () => {
      const createdUser = await UserModel.create({
        name: "Any name",
        email: "any@mail.com",
      });

      const response = await request(server).get(`/user/${createdUser.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });
    });
    test("Should return 404", async () => {
      const response = await request(server).get("/user/not-existent");
      expect(response.statusCode).toBe(404);
    });
  });
});
