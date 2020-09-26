const CrawlerRepository = require('./crawler');

function DomainRepositories(fastify) {
  return {
    crawlerRepository: new CrawlerRepository(fastify),
  };
}

module.exports = DomainRepositories;
