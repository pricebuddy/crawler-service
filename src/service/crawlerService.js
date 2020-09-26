const DomainRepository = require('../repository/domain-repositories');

const { processSellerProducts } = require('../use-cases/processSellerProducts');

const crawlerService = async (fastify) => {
  const domainRepository = new DomainRepository(fastify);

  const sellerId = '13C4B1AA-30DB-4AFB-9FC6-FB913999A86B';

  const response = await processSellerProducts(sellerId, domainRepository);

  return { response };
};

module.exports = {
  crawlerService,
};
