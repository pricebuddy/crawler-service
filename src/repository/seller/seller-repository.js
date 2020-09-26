const makeRepository = (fastify) => {
  const selectAll = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find();

    return res;
  };

  return { selectAll };
};

module.exports = makeRepository;
