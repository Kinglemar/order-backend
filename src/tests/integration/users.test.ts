import request from "supertest";
import httpStatus from "http-status";
import app from "../../app";
import mongoose from "mongoose";

jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test-app", {
    serverSelectionTimeoutMS: 30000,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Users Route", () => {
  describe("POST /user", () => {
    test("It should create a new user when request is valid", async () => {
      const newUser = {
        email: `test${new Date()}@gmail.com`,
        name: `Test User${new Date()}`,
      };
      const response = await request(app)
        .post("/v1/parcels/create-test-users")
        .send(newUser);

      expect(response.status).toBe(httpStatus.CREATED);
      //   expect(response?.body).toHaveLength(response?.body);
    });
  });
});
