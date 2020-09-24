const Joi = require('joi');

function validateQueryWeatherParams(req, res, next) {
  const weatherParamsSchema = Joi.object({
    q: Joi.string().required()
  });

  const { error } = weatherParamsSchema.validate(req.query);

  if (error) {
    const { message } = error.details[0];
    return res.status(422).send({ error: message })
  }
  next();
}

function allowOriginHeader(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
}

function addCorsHeaders(req, res, next) {
  res.set('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  res.status(200).send();
}

module.exports = {
  validateQueryWeatherParams,
  allowOriginHeader,
  addCorsHeaders
}
