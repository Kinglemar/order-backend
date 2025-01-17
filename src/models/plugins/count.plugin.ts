/* eslint-disable no-param-reassign */
import { Schema, Query, Document } from "mongoose";
import { DocCount } from "../../types/document";
export function countDocs<T extends Document>(schema: Schema): void {
  schema.statics.countDocs = async function (
    doctFilter: any
  ): Promise<DocCount<T>> {
    let filter = Object.assign({}, doctFilter);
    if (filter?.dateFrom || filter?.dateTo) {
      filter.createdAt = {
        $gte: new Date(filter.dateFrom),
        $lte: new Date(filter.dateTo),
      };
      delete filter.dateFrom;
      delete filter.dateTo;
    }

    if (filter?.product) {
      filter['cart.items'] = {
        $elemMatch: { productId: filter.product },
      }
      delete filter.product;
    }

    let countPromise = this.countDocuments(filter).exec();
    return Promise.all([countPromise]).then((values) => {
      const [totalResults] = values;
      const totalPages = Math.ceil(totalResults);
      const result = {
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
}
