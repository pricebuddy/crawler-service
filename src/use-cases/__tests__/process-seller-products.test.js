const axios = require('axios');
const Fastify = require('fastify');

jest.mock('axios');

const { processCompetitorProducts } = require('../process-seller-products');
const testData = require('./parisResponse');

const mockDomainRepositories = {
  crawlerRepository: {
    selectCrawlerPaths: jest.fn(),
  },

  productRepository: {
    sellectProductsBySeller: jest.fn(),
    updateSellerProduct: jest.fn(),
  },
};

const fakeCrawlerPaths = {
  internetPricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
  cardPricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
  skuPath: 'string(//p[@class=\'pull-right\']/text())',
};

const fakeProducts = [
  {
    url: 'http://foo.bar/product1',
  },
  {
    url: 'http://foo.bar/product2',
  },
  {
    url: 'http://foo.bar/product3',
  },
];

describe('Should crawl single page', () => {
  let fastify;

  beforeEach(async () => {
    fastify = Fastify();
  });

  it('should process seller products', async () => {
    const sellerId = 'something';

    axios.get.mockImplementation(() => Promise.resolve({ data: testData }));
    mockDomainRepositories.productRepository.sellectProductsBySeller.mockReturnValue(fakeProducts);
    mockDomainRepositories.crawlerRepository.selectCrawlerPaths.mockReturnValue(fakeCrawlerPaths);

    await processCompetitorProducts(sellerId, mockDomainRepositories, fastify);

    expect(mockDomainRepositories.crawlerRepository.selectCrawlerPaths)
      .toHaveBeenCalledWith(sellerId);
    expect(mockDomainRepositories.productRepository.sellectProductsBySeller)
      .toHaveBeenCalledWith(sellerId);
    expect(mockDomainRepositories.productRepository.updateSellerProduct).toHaveBeenCalledTimes(3);
  });
});
