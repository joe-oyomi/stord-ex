import Joi from 'joi';

export const shortenSchema = Joi.object({
  url: Joi.string()
    .uri({
      'scheme': ''
    })
    .uri()
    .message('url should be a valid URL')
    .required(),
  title: Joi.string()
    .optional(),
  description: Joi.string()
    .optional()
})

export const paramsSchema = Joi.object({
  slug: Joi.string()
    .required()
})

export const statsSchema = Joi.object({
  offset: Joi.number()
    .min(0)
    .optional(),
  limit: Joi.number()
    .min(1)
    .optional()
})