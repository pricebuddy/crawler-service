const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res;
  };

  const updateSellerProduct = async (product) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');

    const res = await collection.save(product);

    return res;
  };

  return { sellectProductsBySeller, updateSellerProduct };
};

module.exports = makeRepository;
