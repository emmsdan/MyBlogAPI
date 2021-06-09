import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import ApiWrapper from './api';
import lang from '@lang';
import InitiatorService from '@service/initiator';
import settings from '@global_settings';
import BeLogger from './bin/logger';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
export const bLogger = new BeLogger();

lang.setLang(settings.defaultLocale || 'en');

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) =>  {
  req.translate = (value) => lang.translate(value);
  req.initiator = { set: InitiatorService.set, get: InitiatorService.get };
  req.logger = (msg, type) => bLogger.log (msg, type);
  next();
});

// Load and Wrap all api endpoints
ApiWrapper(app);

app.all('/', function (req, res) {
  res.send(req.translate('welcome'));
});

export default app;
