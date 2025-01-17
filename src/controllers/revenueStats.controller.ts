import { Request, Response } from "express";
import httpStatus from "http-status";
import RevenueStats from "../models/revenueStats.model";
import catchAsync from "../utils/catchAsync";

export const getRevenueStats = catchAsync(
  async (req: Request, res: Response) => {
    const stats = await RevenueStats.findOne().sort({ lastUpdated: -1 });
    res.status(httpStatus.OK).send(stats);
  }
);
