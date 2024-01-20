import Joi from "joi";

export const CreateUser = Joi.object({
  userName: Joi.string().required().min(3),
  email: Joi.string().email().required().min(3),
  password: Joi.string().required().min(3),
  createdAt: Joi.string(),
});