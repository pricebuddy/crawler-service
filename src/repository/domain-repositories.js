const CrawlerRepository = require('./crawlerRepository');

function DomainRepositories(fastify) {
  return {
    userRepository: new CrawlerRepository(fastify),
  };
}

module.exports = DomainRepositories;
