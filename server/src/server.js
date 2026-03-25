require('dotenv').config();

const { loadEnv } = require('./config/env');
const { connectMongo } = require('./db/mongoose');
const { createApp } = require('./app');

async function main() {
  const env = loadEnv();
  const app = createApp({ clientOrigin: env.CLIENT_ORIGIN, env });

  // connect database before listening
  await connectMongo(env.MONGO_URI);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${env.PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal server error:', err);
  process.exit(1);
});

