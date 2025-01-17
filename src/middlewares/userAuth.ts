import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import passport from "passport";
const ApiError = require("../utils/ApiError");
import { roleRights } from "../config/roles";
import { ObjStructure } from "../types/document";

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, user: ObjStructure, info: string) => {
    if (info || err || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role) || [];
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(
          new ApiError(
            httpStatus.FORBIDDEN,
            "You are not authorized to perform this action. Contact an admin."
          )
        );
      }
    }

    resolve();
  };

const userAuth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default userAuth;
