const makeRepository = require('./seller-repository');

class SellerRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectAll() {
    return this.repository.selectAll();
  }
}

module.exports = SellerRepository;
