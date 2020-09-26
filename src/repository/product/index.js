const makeRepository = require('./productRepository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  updateSellerProduct(product) {
    return this.repository.updateSellerProduct(product);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }
}

module.exports = ProductRepository;
