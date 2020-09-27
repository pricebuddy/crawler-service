const makeRepository = (fastify) => {
  const selectAllies = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find({ ally: true });

    return res;
  };

  const selectCompetitors = async () => {
    const { db } = fastify.mongo;

    const collection = db.collection('sellers');

    const res = await collection.find({ ally: false });

    return res;
  };

  return { selectAllies, selectCompetitors };
};

module.exports = makeRepository;
