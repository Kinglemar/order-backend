import { Schema, model } from "mongoose";
import validator from "validator";
import { paginate } from "./plugins/paginate.plugin";
import toJSON from "./plugins/toJSON.plugin";
import { TestUser, PaginateModel } from "../types/document";

const TestUserSchema: Schema = new Schema<TestUser>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    customerId: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

TestUserSchema.plugin(toJSON);
TestUserSchema.plugin(paginate);

const TestUserModel = model<TestUser>(
  "TestUser",
  TestUserSchema
) as PaginateModel<TestUser>;

export default TestUserModel;
