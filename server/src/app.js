const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { authRouter } = require('./routes/auth');
const { activitiesRouter } = require('./routes/activities');
const { progressRouter } = require('./routes/progress');
const { usersRouter } = require('./routes/users');
const { assignmentsRouter } = require('./routes/assignments');
const { messagesRouter } = require('./routes/messages');
const { trainingAssignmentsRouter } = require('./routes/trainingAssignments');
const { announcementsRouter } = require('./routes/announcements');
const { supportRouter } = require('./routes/support');

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
  app.use('/api/progress', progressRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/assignments', assignmentsRouter);
  app.use('/api/messages', messagesRouter);
  app.use('/api/training-assignments', trainingAssignmentsRouter);
  app.use('/api/announcements', announcementsRouter);
  app.use('/api/support', supportRouter);

  return app;
}

module.exports = { createApp };

