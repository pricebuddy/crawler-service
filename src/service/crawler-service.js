const DomainRepository = require('../repository/domain-repositories');

const { getAllSellers } = require('../use-cases/get-sellers');
const { processSellerProducts } = require('../use-cases/process-seller-products');

const crawlerService = async (fastify) => {
  const domainRepository = new DomainRepository(fastify);
  const allSellers = await getAllSellers();

  const response = await allSellers.forEach(async (seller) => {
    await processSellerProducts(seller.id, domainRepository);
  });

  return response;
};

module.exports = {
  crawlerService,
};
