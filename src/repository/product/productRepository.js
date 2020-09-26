const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res;
  };

  const insertSellerProduct = async (product) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');

    const res = await collection.updateOne(product);

    return res;
  };

  return { insertSellerProduct, sellectProductsBySeller };
};

module.exports = makeRepository;
