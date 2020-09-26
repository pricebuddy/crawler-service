const CrawlerRepository = require('./crawler');
const ProductRepository = require('./product');

function DomainRepositories(fastify) {
  return {
    crawlerRepository: new CrawlerRepository(fastify),
    productRepository: new ProductRepository(fastify),
  };
}

module.exports = DomainRepositories;
