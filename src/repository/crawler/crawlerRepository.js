const makeRepository = (fastify) => {
  const selectCrawlerPaths = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('crawlerPaths');
    const query = { sellerId };

    const res = await collection.findOne(query);

    return res;
  };

  return { selectCrawlerPaths };
};

module.exports = makeRepository;
