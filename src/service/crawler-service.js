const DomainRepository = require('../repository/domain-repositories');

const { getAllySellers, getCompetitorSellers } = require('../use-cases/get-sellers');
const { processAllyProducts, processCompetitorProducts } = require('../use-cases/process-seller-products');

const crawlerService = async (fastify) => {
  const domainRepository = new DomainRepository(fastify);

  const allAllies = await getAllySellers(domainRepository);
  const allCompetitors = await getCompetitorSellers(domainRepository);

  await allCompetitors.forEach(async (seller) => {
    await processCompetitorProducts(seller.id, domainRepository, fastify);
  });

  await allAllies.forEach(async (seller) => {
    await processAllyProducts(seller.id, domainRepository, fastify);
  });

  return '';
};

module.exports = {
  crawlerService,
};
