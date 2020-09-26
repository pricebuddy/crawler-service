const axios = require('axios');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser

const pricePath = "string(//div[@class='item-price offer-price price-tc cencosud-price-2']/text())"

axios
  .get('https://www.paris.cl/set-bistro-mesa-hierro-2-sillas-outzen-505664999.html')
  .then((response) => {
    const doc = new dom().parseFromString(response.data, 'application/xml');
    const price = xpath.select(pricePath, doc);
    const name = xpath.select("//h1[@class='no-pb js-product-name']", doc);
    const brand = xpath.select("string(//a[@id='GTM_pdp_brand'])", doc);
    const internetPrice = xpath.select("string(//div[@class='col-xs-12 col-sm-12 col-md-6 col-lg-5 info-product-detail']/div[@class='row row-info-product']/div[@class='col-xs-12 product-price-2']/div[@class='col-md-6 col-xs-7 price noPad']/div[@class='row-price']/div[@class='column-price details-price']/div[@class='item-price price-internet-wrapper']/div[@class='price-internet ']/span)", doc);

    name[0].removeChild(name[0].childNodes[1])

    console.log(name.replace(/(?:\r\n|\r|\n)/g,'').trim());
    console.log(price.trim().split("$")[1]);
    console.log(internetPrice.trim().split("$")[1]);
    console.log(brand);
  });