/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const Dom = require('xmldom').DOMParser;
const xpath = require('xpath');

const docSilentHandler = {
  warning(w) { },
  error(e) { },
  fatalError(e) { },
};

function waitforme(ms) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(''); }, ms);
  });
}

const getSingleProductDataFromMasterUrl = async (url, crawlerPaths) => {
  const product = {};
  const { pricePath, namePath } = crawlerPaths;

  const response = await axios.get(url);
  const doc = new Dom({
    locator: {},
    errorHandler: docSilentHandler,
  }).parseFromString(response.data);
  product.name = xpath.select(namePath, doc).trim();
  product.price = xpath.select(pricePath, doc).trim().split('$')[1].replace(/\./g, '');
  return product;
};

const getSingleProductDataFromUrl = async (url, crawlerPaths) => {
  const product = {};
  const { internetPricePath, cardPricePath, skuPath } = crawlerPaths;

  const response = await axios.get(url);
  const doc = new Dom({
    locator: {},
    errorHandler: docSilentHandler,
  }).parseFromString(response.data);
  const internetPriceRaw = xpath.select(internetPricePath, doc);
  const internetPrice = internetPriceRaw === '' ? internetPriceRaw : internetPriceRaw.trim().split('$')[1].replace(/\./g, '');
  const cardPriceRaw = xpath.select(cardPricePath, doc);
  const cardPrice = cardPriceRaw === '' ? cardPriceRaw : cardPriceRaw.trim().split('$')[1].replace(/\./g, '');

  product.sku = xpath.select(skuPath, doc).replace('SKU ', '');
  product.price = cardPrice || internetPrice;

  return product;
};

const processAllyProducts = async (sellerId, repositories, fastify) => {
  const crawlerPaths = await repositories.crawlerRepository.selectCrawlerPaths(sellerId);
  const products = await repositories.productRepository.sellectProductsBySeller(sellerId);

  await products.forEach(async (product) => {
    const { url, parentId } = product;

    const { price, name } = await getSingleProductDataFromMasterUrl(url, crawlerPaths);
    const productToSave = {
      ...product,
      price,
    };

    const masterProductToSave = {
      parentId,
      name,
    };

    await repositories.productRepository.updateSellerProduct(productToSave);
    await repositories.productRepository.updateMasterProduct(masterProductToSave);
    fastify.log.info(productToSave);
    return productToSave;
  });
};

const processCompetitorProducts = async (sellerId, repositories, fastify) => {
  const crawlerPaths = await repositories.crawlerRepository.selectCrawlerPaths(sellerId);
  const products = await repositories.productRepository.sellectProductsBySeller(sellerId);

  for (const product of products) {
    const { url } = product;

    fastify.log.info(`CRAWLING PAGE: ${url}`);

    const { price, sku } = await getSingleProductDataFromUrl(url, crawlerPaths);
    const productToSave = {
      ...product,
      price,
      sku,
    };
    fastify.log.info(`PRICE UPDATED: ${price}`);

    await repositories.productRepository.updateSellerProduct(productToSave);
    await waitforme(500);
  }
};

module.exports = { processAllyProducts, processCompetitorProducts };
