const makeRepository = require('./seller-repository');

class SellerRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectSeller(product) {
    return this.repository.selectSeller(product);
  }
}

module.exports = SellerRepository;
