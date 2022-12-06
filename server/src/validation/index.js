import { shortenSchema, paramsSchema, statsSchema } from './schemas.js';

function _validate(res, next, schema, data) {
  const { error } = schema.validate(data);
  if(error) {
    return res.status(400).json({
      statusCode: 400,
      message: 'error',
      error: error.details[0].message,
      data: null
    })
  } else {
    next()
  }
}

class Validation {
  constructor() {}

  validateShorten(req, res, next) {
    _validate(res, next, shortenSchema, req.body)
  }

  validateParams(req, res, next) {
    _validate(res, next, paramsSchema, req.params)
  }

  validateStats(req, res, next) {
    _validate(res, next, statsSchema, req.query)
  }
}

export default Validation