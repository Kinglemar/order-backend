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

describe("Orders Route", () => {
  describe("GET /orders", () => {
    test("It should return a list of orders", async () => {
      const response = await request(app).get(
        "/v1/parcels/get-test-orders?limit=10"
      );
      expect(response.status).toBe(httpStatus.OK);
      expect(response?.body.data).toHaveLength(response?.body.data.length);
    });
  });
});
