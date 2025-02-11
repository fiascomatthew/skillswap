import Joi from 'joi';

const searchSkillSchema = Joi.object({
  query: Joi.string().min(1).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  location: Joi.string().required(),
  terms: Joi.boolean().truthy('on').falsy('off').required(),
});

export { searchSkillSchema, loginSchema, registerSchema };
