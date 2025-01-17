/* eslint-disable no-param-reassign */
import { Schema, Query, Document } from "mongoose";
import { PaginationResult } from "../../types/document";
export function paginate<T extends Document>(schema: Schema): void {
  schema.statics.paginate = async function (
    filter: any,
    options: any
  ): Promise<PaginationResult<T>> {
    let sort = "";
    if (options?.sortBy) {
      const sortingCriteria = options.sortBy
        .split(",")
        .map((sortOption: any) => {
          const [key, order] = sortOption.split(":");
          return (order === "desc" ? "-" : "") + key;
        });
      sort = sortingCriteria.join(" ");
    } else {
      sort = "createdAt";
    }

    if (filter?.dateFrom || filter?.dateTo) {
      filter.createdAt = {
        $gte: new Date(filter.dateFrom),
        $lte: filter?.dateTo ? new Date(filter?.dateTo) : new Date(),
      };
      delete filter.dateFrom;
      delete filter.dateTo;
    }

    if (filter?.parcelCode) {
      filter.parcelCode = { $regex: new RegExp(filter.parcelCode, "i") };
    }
    if (filter?.first_name || filter?.last_name) {
      filter.first_name = { $regex: new RegExp(filter.first_name, "i") };
      filter.last_name = { $regex: new RegExp(filter.last_name, "i") };
    }
    if (filter.username) {
      filter.username = { $regex: new RegExp(filter.username, "i") };
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(",").forEach((populateOption: any) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split(".")
            .reverse()
            .reduce((a: any, b: any) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, data] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        data,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
}
