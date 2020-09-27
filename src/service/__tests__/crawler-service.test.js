const { crawlerService } = require('../crawler-service');
const { getCompetitorSellers, getAllySellers } = require('../../use-cases/get-sellers');
const { processAllyProducts, processCompetitorProducts } = require('../../use-cases/process-seller-products');

jest.mock('../../use-cases/get-sellers', () => ({
  getAllySellers: jest.fn().mockResolvedValue([{ id: 'foo' }, { id: 'foo' }]),
  getCompetitorSellers: jest.fn().mockResolvedValue([{ id: 'foo' }, { id: 'foo' }]),
}));

jest.mock('../../use-cases/process-seller-products', () => ({
  processAllyProducts: jest.fn().mockResolvedValue({ id: 'foo' }),
  processCompetitorProducts: jest.fn().mockResolvedValue({ id: 'foo' }),
}));
let fastify;

describe('Should call service', () => {
  beforeAll(() => {
    fastify = jest.fn();
  });

  it('should call use case for allys', async () => {
    await crawlerService(fastify);
    expect(getAllySellers).toHaveBeenCalled();
    expect(getCompetitorSellers).toHaveBeenCalled();
    expect(processAllyProducts).toHaveBeenCalledTimes(2);
    expect(processCompetitorProducts).toHaveBeenCalledTimes(2);
  });
});
