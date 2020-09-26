const { crawlerService } = require('../crawler-service');
const { getAllSellers } = require('../../use-cases/get-sellers');
const { processSellerProducts } = require('../../use-cases/process-seller-products');

jest.mock('../../use-cases/get-sellers', () => ({
  getAllSellers: jest.fn().mockResolvedValue([{ id: 'foo' }, { id: 'foo' }]),
}));

jest.mock('../../use-cases/process-seller-products', () => ({
  processSellerProducts: jest.fn().mockResolvedValue({ id: 'foo' }),
}));

let fastify;

describe('Should call service', () => {
  beforeAll(() => {
    fastify = jest.fn();
  });

  it('should call use case', async () => {
    await crawlerService(fastify);
    expect(getAllSellers).toHaveBeenCalled();
    expect(processSellerProducts).toHaveBeenCalledTimes(2);
  });
});
