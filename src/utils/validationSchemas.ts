import Joi from 'joi';

export const searchSkillSchema = Joi.object({
  query: Joi.string().min(1).max(100).required(),
});
