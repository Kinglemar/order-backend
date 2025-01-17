import Joi from "joi";

const createVal = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    geolocation: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array().max(2),
    }),
  }),
} as const;

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    phone_number: Joi.string(),
    doneKyc: Joi.boolean(),
    geolocation: Joi.object({
      type: Joi.string(),
      coordinates: Joi.array().max(2),
    }),
  }),
} as const;

const getUsers = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string().email(),
    doneKyc: Joi.string().email(),
    sortBy: Joi.string(),
    dateFrom: Joi.string(),
    dateTo: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
} as const;

const getUser = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
} as const;
const getUserViaEmail = {
  body: Joi.object().keys({
    email: Joi.string(),
  }),
} as const;
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
} as const;

export {
  createVal,
  updateUser,
  getUser,
  getUsers,
  getUserViaEmail,
  deleteUser,
};
