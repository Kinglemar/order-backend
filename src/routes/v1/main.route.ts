import express from "express";
const mainRouter = express.Router();

import {
  getOrders,
  createTestUser,
  getTestUsers,
} from "../../controllers/user.controller";

mainRouter.route("/create-test-users").post(createTestUser);
mainRouter.route("/get-test-orders").get(getOrders);
mainRouter.route("/get-test-users").get(getTestUsers);
export default mainRouter;
