const axios = require('axios');
const Dom = require('xmldom').DOMParser;
const xpath = require('xpath');

const docSilentHandler = {
  warning(w) { },
  error(e) { },
  fatalError(e) { },
};

const getSingleProductDataFromUrl = async (url, crawlerPaths) => {
  const product = {};
  const { pricePath, skuPath } = crawlerPaths;

  const response = await axios.get(url);
  const doc = new Dom({
    locator: {},
    errorHandler: docSilentHandler,
  }).parseFromString(response.data);
  product.price = xpath.select(pricePath, doc).trim().split('$')[1].replace('.', '');
  product.sku = xpath.select(skuPath, doc).replace('SKU ', '');
  return product;
};

const processSellerProducts = async (sellerId, repositories, fastify) => {
  const crawlerPaths = await repositories.crawlerRepository.selectCrawlerPaths(sellerId);
  const products = await repositories.productRepository.sellectProductsBySeller(sellerId);

  await products.forEach(async (product) => {
    const { url } = product;

    const { price, sku } = await getSingleProductDataFromUrl(url, crawlerPaths);
    const productToSave = {
      ...product,
      price,
      sku,
    };
    await repositories.productRepository.updateSellerProduct(productToSave);
    fastify.log.info(productToSave);
    return productToSave;
  });
};

module.exports = { getSingleProductDataFromUrl, processSellerProducts };
