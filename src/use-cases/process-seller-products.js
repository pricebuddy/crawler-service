const axios = require('axios');
const dom = require('xmldom').DOMParser;
const xpath = require('xpath');

// crawl by url on demand
const getSingleProductDataFromUrl = async (url, crawlerPaths) => {
  const product = {};
  const { pricePath, skuPath } = crawlerPaths;

  const response = await axios.get(url);
  const doc = new dom({
    locator: {},
    errorHandler: {
      warning(w) { },
      error(e) { },
      fatalError(e) { console.error(e); },
    },
  }).parseFromString(response.data);
  product.price = xpath.select(pricePath, doc).trim().split('$')[1].replace('.', '');
  product.sku = xpath.select(skuPath, doc).replace('SKU ', '');
  return product;
};

const processSellerProducts = async (sellerId, repositories) => {
  const crawlerPaths = await repositories.crawlerRepository.selectCrawlerPaths(sellerId);
  const products = await repositories.productRepository.sellectProductsBySeller(sellerId);

  // Get product list from repo by sellerId from db
  await products.forEach(async (product) => {
    const { price, sku } = await getSingleProductDataFromUrl(product.url, crawlerPaths);
    const productToSave = {
      ...product,
      price,
      sku,
    };
    await repositories.productRepository.updateSellerProduct(productToSave);
  });
};

module.exports = { getSingleProductDataFromUrl, processSellerProducts };
