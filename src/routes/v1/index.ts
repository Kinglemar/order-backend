const express = require("express");
const appRouter = express.Router();

import mainRouter from "./main.route";

const defaultRoutes = [
  {
    path: "/parcels",
    route: mainRouter,
  },
];

defaultRoutes.forEach((route) => {
  appRouter.use(route.path, route.route);
});

export default appRouter;
