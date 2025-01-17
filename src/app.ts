import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import httpStatus from "http-status";
import config from "./config/config";
import morganConfig from "./config/morgan";
import authLimiter from "./middlewares/rateLimiter";
import timestamp from "./middlewares/timestamp";
import { errorConverter, errorHandler } from "./middlewares/error";
import appRouter from "./routes/v1";

require("./config/passport");

const app = express();

if (config.env !== "test") {
  app.use(morganConfig.successHandler);
  app.use(morganConfig.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: "20mb" }));

// parse urlencoded request body
app.use(
  express.urlencoded({ extended: true, limit: "20mb", parameterLimit: 50000 })
);

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
app.use(
  session({
    secret: "plain",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.session());

// limit repeated failed requests to auth endpoints
app.use("/v1", authLimiter, timestamp);

app.get("/", (req, res) => {
  res.send({
    status: httpStatus.OK,
    message: "Test app is ready.",
  });
});

app.get("/status", (req, res) => {
  return res.sendStatus(200);
});

app.use("/v1", appRouter);

// Convert error
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
