const makeRepository = require('./crawler-repository');

class CrawlerRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectCrawlerPaths(sellerId) {
    return this.repository.selectCrawlerPaths(sellerId);
  }
}

module.exports = CrawlerRepository;
