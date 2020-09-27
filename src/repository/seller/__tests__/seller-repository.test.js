const Fastify = require('fastify');
const SellerRepository = require('..');

describe('Seller repository', () => {
  let fastify;
  let sellerRepository;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.mongo = {
      db: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn(),
      },
    };
    sellerRepository = new SellerRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  describe('Product repository tests', () => {
    it('should call find all sellers', async () => {
      await sellerRepository.selectCompetitors();

      expect(fastify.mongo.db.find).toHaveBeenCalled();
    });
  });
});
