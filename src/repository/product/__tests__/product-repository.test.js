const faker = require('faker');
const Fastify = require('fastify');
const ProductRepository = require('..');

describe('Product repository', () => {
  let fastify;
  let productRepository;

  beforeEach(async () => {
    fastify = Fastify();
    fastify.mongo = {
      db: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn(),
        save: jest.fn(),
      },
    };
    productRepository = new ProductRepository(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  describe('Product repository tests', () => {
    it('should call find by sellerId', async () => {
      const sellerId = faker.random.uuid();

      await productRepository.sellectProductsBySeller(sellerId);

      expect(fastify.mongo.db.find).toHaveBeenCalledWith({ sellerId });
    });

    it('should call save product', async () => {
      const product = {};

      await productRepository.updateSellerProduct(product);

      expect(fastify.mongo.db.collection).toHaveBeenCalledWith('products');
      expect(fastify.mongo.db.save).toHaveBeenCalledWith(product);
    });
  });
});
