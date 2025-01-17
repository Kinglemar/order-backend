import mongoose from "mongoose";

export interface IRevenueStats {
  totalRevenue: number;
  lastUpdated: Date;
  orderCount: number;
}

const revenueStatsSchema = new mongoose.Schema<IRevenueStats>(
  {
    totalRevenue: {
      type: Number,
      required: true,
      default: 0,
    },
    orderCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const RevenueStats = mongoose.model<IRevenueStats>(
  "RevenueStats",
  revenueStatsSchema
);

export default RevenueStats;
