const log = require('pino')({ level: 'info' });
const fastify = require('fastify')({ logger: log });
const fastifyCron = require('fastify-cron');

const { crawlerService } = require('./src/service/crawlerService');

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.register(fastifyCron, {
  jobs: [
    {

      cronTime: '*/1 * * * *', // every 1 min
      onTick: async (server) => {
        server.log.info('Cron tick');
        const result = await crawlerService(server);
        server.log.info(result);
      },
    },
  ],
});

fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/buddy',
});

fastify.get('/test', async (req, reply) => {
  const result = await crawlerService(fastify);
  reply.send(result);
});

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

fastify.listen(() => {
  fastify.cron.startAllJobs();
});
