import httpStatus from "http-status";
import { RequestHandler, Request, Response } from "express";
import pick from "../utils/pick";
import catchAsync from "../utils/catchAsync";
const ApiError = require("../utils/ApiError");

import TestUser from "../models/testusers.model";
import OrderModel from "../models/orders.model";

export const getTestUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "email"]);
    const results = await TestUser.find(filter);
    res.status(httpStatus.OK).send(results);
  }
);
export const createTestUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await TestUser.findOneAndUpdate(
      { email },
      { name, email },
      { upsert: true, new: true }
    );
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "Unable to create user");
    }
    res.status(httpStatus.CREATED).send(user);
  }
);
export const getOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["totalAmount", "customerId"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);

    const results = await OrderModel.paginate(filter, options);
    res.status(httpStatus.OK).send(results);
  }
);
