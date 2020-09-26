const axios = require('axios');
const dom = require('xmldom').DOMParser
const xpath = require('xpath');

// crawl by url on demand

// cron job

    // read db for competitor products and iterate through url

    // get single product data and insert into db

const pricePath = "string(//div[@class='item-price offer-price price-tc cencosud-price-2']/text())"
const skuPath = "string(//p[@class='pull-right']/text())"

const getSingleProductDataFromUrl = async (url) => {

    const product = {};

    const response = await axios.get(url);
    const doc = new dom().parseFromString(response.data, "text/xml");
    product.price = xpath.select(pricePath, doc).trim().split("$")[1].replace('.','');
    product.sku = xpath.select(skuPath, doc).replace('SKU ', '');
    return product;

} 

module.exports = { getSingleProductDataFromUrl }