const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { authRouter } = require('./routes/auth');
const { activitiesRouter } = require('./routes/activities');

function createApp({ clientOrigin, env }) {
  const app = express();
  app.locals.env = env;

  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  app.use(cors({
    origin: clientOrigin,
    credentials: true,
  }));

  app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'inklukids-server' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/activities', activitiesRouter);

  return app;
}

module.exports = { createApp };

