const DomainRepository = require('../repository/domain-repositories');

const { processSellerProducts } = require('../use-cases/process-seller-products');

const crawlerService = async (fastify) => {
  const domainRepository = new DomainRepository(fastify);

  const sellerIds = ['13C4B1AA-30DB-4AFB-9FC6-FB913999A86B', '38B93994-CC0B-4780-8266-B9123953D75A'];

  const response = await processSellerProducts(sellerIds[0], domainRepository);

  return { response };
};

module.exports = {
  crawlerService,
};
