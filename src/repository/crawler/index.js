const makeRepository = require('./crawlerRepository');

class CrawlerRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectCrawlerPaths(fastify) {
    return this.repository.selectCrawlerPaths(fastify);
  }
}

module.exports = CrawlerRepository;
