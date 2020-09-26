const log = require('pino')({ level: 'info' });
const fastify = require('fastify')({ logger: log });
const fastifyCron = require('fastify-cron');

const { processSellerProducts } = require('./src/service/crawlerService');

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.register(fastifyCron, {
  jobs: [
    {

      cronTime: '*/1 * * * *', // every 1 min
      onTick: async (server) => {
        server.log.info('Cron tick');
        const result = await processSellerProducts();
        server.log.info(result);
      },
    },
  ],
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
