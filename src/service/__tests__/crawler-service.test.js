const { crawlerService } = require('../crawler-service');
const { getCompetitorSellers } = require('../../use-cases/get-sellers');
const { processSellerProducts } = require('../../use-cases/process-seller-products');

jest.mock('../../use-cases/get-sellers', () => ({
  getCompetitorSellers: jest.fn().mockResolvedValue([{ id: 'foo' }, { id: 'foo' }]),
}));

jest.mock('../../use-cases/get-sellers', () => ({
  getAllySellers: jest.fn().mockResolvedValue([{ id: 'foo' }, { id: 'foo' }]),
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
    expect(getCompetitorSellers).toHaveBeenCalled();
    expect(processSellerProducts).toHaveBeenCalledTimes(2);
  });
});
