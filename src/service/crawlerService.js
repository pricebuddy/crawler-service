const axios = require('axios');
const dom = require('xmldom').DOMParser
const xpath = require('xpath');

// cron job

// read db for competitor products and iterate through url
const processSellerProducts = (sellerId) => {
    // Get product list from repo by sellerId
    const products = [
        {
            url: "https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html"
        },
        {
            url: "https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html"
        }
    ]
    // iterate
    for (const product of products){
        // call getSingleProductDataFromUrl with prod url
        const crawledPrice = getSingleProductDataFromUrl(product.url);
        // save price and sku on db
    }
}

const pricePath = "string(//div[@class='item-price offer-price price-tc cencosud-price-2']/text())"
const skuPath = "string(//p[@class='pull-right']/text())"

// crawl by url on demand
const getSingleProductDataFromUrl = async (url) => {

    const product = {};

    const response = await axios.get(url);
    const doc = new dom().parseFromString(response.data, "text/xml");
    product.price = xpath.select(pricePath, doc).trim().split("$")[1].replace('.','');
    product.sku = xpath.select(skuPath, doc).replace('SKU ', '');
    return product;

} 

module.exports = { getSingleProductDataFromUrl }