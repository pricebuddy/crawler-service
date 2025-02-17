const makeRepository = require('./product-repository');

class ProductRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  updateSellerProduct(product) {
    return this.repository.updateSellerProduct(product);
  }

  updateMasterProduct(product) {
    return this.repository.updateMasterProduct(product);
  }

  sellectProductsBySeller(sellerId) {
    return this.repository.sellectProductsBySeller(sellerId);
  }
}

module.exports = ProductRepository;
