const cheerio = require('cheerio');
const axios = require('axios');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser

axios
  .get('https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html')
  .then((response) => {
    const doc = new dom().parseFromString(response.data);
    const price = xpath.select("string(//div[@class='item-price offer-price price-tc cencosud-price-2']/text())", doc);
    const name = xpath.select("string(//h1[@class='no-pb js-product-name'])", doc);
    const internetPrice = xpath.select("//div[@class='row row-info-product']/div[@class='col-xs-12 product-price-2']/div[@class='col-md-6 col-xs-7 price noPad']/div[@class='row-price']/div[@class='column-price details-price']/div[@class='item-price price-internet-wrapper']/div[@class='price-internet']/span", doc);

    console.log(name);
    console.log(price.trim().split("$")[1]);
    console.log(internetPrice);
  });