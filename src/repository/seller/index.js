const makeRepository = require('./seller-repository');

class SellerRepository {
  constructor(fastify) {
    this.fastify = fastify;
    this.repository = makeRepository(fastify);
  }

  selectAllies() {
    return this.repository.selectAllies();
  }

  selectCompetitors() {
    return this.repository.selectCompetitors();
  }
}

module.exports = SellerRepository;
