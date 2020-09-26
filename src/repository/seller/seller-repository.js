const makeRepository = (fastify) => {
  const selectSeller = async (id) => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');
    const query = { id };

    const res = await collection.findOne(query);

    return res;
  };

  return { selectSeller };
};

module.exports = makeRepository;
