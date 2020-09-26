const makeRepository = require('./productRepository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  insertSellerProduct(product) {
    return this.repository.insertSellerProduct(product);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }
}

module.exports = ProductRepository;
