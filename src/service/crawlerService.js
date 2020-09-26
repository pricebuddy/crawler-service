const axios = require('axios');
const dom = require('xmldom').DOMParser;
const xpath = require('xpath');

// cron job

// read db for competitor products and iterate through url
const processSellerProducts = async (sellerId) => {
  // Get seller crawler paths from db
  const crawlerPaths = {
    pricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
    skuPath: 'string(//p[@class=\'pull-right\']/text())',
  };

  // Get product list from repo by sellerId from db
  const products = [
    {
      url: 'https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html',
    },
    {
      url: 'https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html',
    },
  ];

  // iterate
  for (const product of products) {
    // call getSingleProductDataFromUrl with prod url
    const crawledPrice = await getSingleProductDataFromUrl(product.url, crawlerPaths);
    // save price and sku on db
    console.log(crawledPrice);
  }
};

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

module.exports = { getSingleProductDataFromUrl, processSellerProducts };
