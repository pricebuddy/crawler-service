const { crawlerService } = require('../crawler-service');
const { processSellerProducts } = require('../../use-cases/process-seller-products');

jest.mock('../../use-cases/process-seller-products', () => ({
  processSellerProducts: jest.fn().mockResolvedValue({ id: 'foo' }),
}));

let fastify;

describe('Should call service', () => {
  beforeAll(() => {
    fastify = jest.fn();
  });

  it('should call use case', async () => {
    crawlerService(fastify);
    expect(processSellerProducts).toHaveBeenCalled();
  });
});
