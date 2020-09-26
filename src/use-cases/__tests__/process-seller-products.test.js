const axios = require('axios');
const Fastify = require('fastify');

jest.mock('axios');

const { getSingleProductDataFromUrl, processSellerProducts } = require('../process-seller-products');
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
  pricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
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

  it('should get info from a url and get name and price', async () => {
    const url = 'http://foo.bar/product1';
    const crawlerPaths = {
      pricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
      skuPath: 'string(//p[@class=\'pull-right\']/text())',
    };

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: testData }));

    const result = await getSingleProductDataFromUrl(url, crawlerPaths);

    expect(axios.get).toHaveBeenCalledWith('http://foo.bar/product1');
    expect(result.price).toBe('179990');
    expect(result.sku).toBe('505664999');
  });

  it('should process seller products', async () => {
    const sellerId = 'something';

    axios.get.mockImplementation(() => Promise.resolve({ data: testData }));
    mockDomainRepositories.productRepository.sellectProductsBySeller.mockReturnValue(fakeProducts);
    mockDomainRepositories.crawlerRepository.selectCrawlerPaths.mockReturnValue(fakeCrawlerPaths);

    await processSellerProducts(sellerId, mockDomainRepositories, fastify);

    expect(mockDomainRepositories.crawlerRepository.selectCrawlerPaths)
      .toHaveBeenCalledWith(sellerId);
    expect(mockDomainRepositories.productRepository.sellectProductsBySeller)
      .toHaveBeenCalledWith(sellerId);
    expect(mockDomainRepositories.productRepository.updateSellerProduct).toHaveBeenCalledTimes(3);
  });
});
