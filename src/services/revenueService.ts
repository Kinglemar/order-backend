import OrderModel from "../models/orders.model";
import { logger } from "../config/logger";

export const calculateRevenue = async () => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const stats = orders[0] || { totalRevenue: 0 };
    logger.info(`Total Revenue: ${stats.totalRevenue}`);
  } catch (e) {
    logger.error(e);
  }
};
