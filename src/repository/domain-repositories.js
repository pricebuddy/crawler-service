const CrawlerRepository = require('./crawler');
const ProductRepository = require('./product');
const SellerRepository = require('./seller');

function DomainRepositories(fastify) {
  return {
    crawlerRepository: new CrawlerRepository(fastify),
    productRepository: new ProductRepository(fastify),
    sellerRepository: new SellerRepository(fastify),
  };
}

module.exports = DomainRepositories;
