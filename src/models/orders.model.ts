import { Schema, model } from "mongoose";
import validator from "validator";
import { paginate } from "./plugins/paginate.plugin";
import toJSON from "./plugins/toJSON.plugin";
import { roles } from "../config/roles";
import { IOrders, PaginateModel } from "../types/document";

const OrderSchema: Schema = new Schema<IOrders>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "TestUser",
      required: false,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

const OrderModel = model<IOrders>(
  "Orders",
  OrderSchema
) as PaginateModel<IOrders>;

export default OrderModel;
