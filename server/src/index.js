import express from 'express';
import cors from 'cors';
import * as dontenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { query, CREATE_TABLE } from './helpers/index.js';
import winston from 'winston';

const app = express();
dontenv.config()
app.use(cors());
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const Logger = (error, request, response, next) => {
  console.error( `error ${error.message}`) 
  next(error)
}

const errorHandler = (error, _req, res, next) => {    
  const status = error.status || 500
  res.status(status).json({
    statusCode: status,
    message: 'error',
    error: error.message || error,
    data: null
  })
}

const fallbackRoute = (_req, res, _next) => {
  res.status(405).json({
    message: 'error',
    error: 'Method not allowed',
    statusCode: 405,
    data: null
  })
}

app.use(jsonParser)
app.use(urlencodedParser)

const PORT = process.env.PORT || 3001;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'shorten-service' },
  transports: [
    new winston.transports.Console(),
  ],
});

app.use((req, _res, next) => {
  logger.info(req.originalUrl)
  logger.info(req?.body)
  next()
})
app.use(router);

app.use(Logger)
app.use(errorHandler)
app.use(fallbackRoute)

app.listen(PORT, () => {
  query(CREATE_TABLE);
  console.log('listening on ' + PORT)
})

export default app;