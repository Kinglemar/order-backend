import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
dotenv.config({ path: path.join(__dirname, "/../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(9000),
    MONGODB_URL: Joi.string()
      .required()
      .description("Mongo db connection string"),
  })
  .unknown();

const { value, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: value.PORT,
  env: value.NODE_ENV,
  mongoose: {
    url: value.MONGODB_URL,
  },
  secret: value.SSS,
  email: {
    smtp: {
      host: value.SMTP_HOST,
      port: value.SMTP_PORT,
      auth: {
        user: value.SMTP_USERNAME,
        pass: value.SMTP_PASSWORD,
      },
    },
    from: `"ZenditNow" <${value.EMAIL_FROM}>`,
  },
  socket: {
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: false,
    },
  },
  jwt: {
    secret: value.JWT_SECRET,
    accessExpirationMinutes: value.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: value.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: value.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: value.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  cloudinary: {
    cloud_name: value.CLOUD_NAME,
    api_key: value.CLOUDINARY_API_KEY,
    api_secret: value.CLOUDINARY_API_SECRET,
  },
  flutter: {
    secret_hash: value.FLW_SECRET_HASH,
    public_key: value.FLW_PUBLIC_KEY,
    secret_key: value.FLW_SECRET_KEY,
  },
};

export default config;
