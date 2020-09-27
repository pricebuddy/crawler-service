const makeRepository = (fastify) => {
  const sellectProductsBySeller = async (sellerId) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');
    const query = { sellerId };

    const res = await collection.find(query);

    return res.toArray();
  };

  const updateSellerProduct = async (product) => {
    const { db } = fastify.mongo;

    const collection = db.collection('products');

    const res = await collection.save(product);

    return res;
  };

  const updateMasterProduct = async (product) => {
    const { db } = fastify.mongo;

    const collection = db.collection('masterProduct');

    const res = await collection.save(product);

    return res;
  };

  return { sellectProductsBySeller, updateSellerProduct, updateMasterProduct };
};

module.exports = makeRepository;
