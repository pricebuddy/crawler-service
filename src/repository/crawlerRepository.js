const selectCrawlerPaths = () => ({
  pricePath: 'string(//div[@class=\'item-price offer-price price-tc cencosud-price-2\']/text())',
  skuPath: 'string(//p[@class=\'pull-right\']/text())',
});

module.exports = selectCrawlerPaths;
