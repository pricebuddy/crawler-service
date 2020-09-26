const faker = require('faker');
const Fastify = require('fastify');
const CrawlerRepository = require('..');

describe('Crawler repository', () => {
  let fastify;
  let crawlerRepository;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.mongo = {
      db: {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
      },
    };
    crawlerRepository = new CrawlerRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  describe('Crawler repository tests', () => {
    it('should call find', async () => {
      const sellerId = faker.random.uuid();

      await crawlerRepository.selectCrawlerPaths(sellerId);

      expect(fastify.mongo.db.findOne).toHaveBeenCalledWith({ sellerId });
    });
  });
});
