import { Request, Response, NextFunction } from "express";
import { parseDate } from "../utils/timestampUtility";

const timestamp = async (req: Request, res: Response, next: NextFunction) => {
  const timezone = req.headers["x-visitor-data"] || "Africa/Lagos";
  if (!timezone || timezone == "undefined") {
    req.authInfo = {
      time: parseDate("Africa/Lagos"),
    };
    next();
  }
  console.log({
    timezone,
    format: parseDate(timezone),
  });

  req.authInfo = {
    time: parseDate(timezone),
  };
  next();
};

export default timestamp;
