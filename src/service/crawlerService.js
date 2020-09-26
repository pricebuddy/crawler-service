const DomainRepository = require('../repository/domain-repositories');

const processSellerProducts = require('../use-cases/processSellerProducts');

const crawlerService = async (fastify) => {
  const domainRepository = new DomainRepository(fastify);

  const sellerId = '';

  const response = await processSellerProducts(sellerId, domainRepository);

  return { response };
};

module.exports = {
  crawlerService,
};
