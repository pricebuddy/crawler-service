"use strict";
const axios = require('axios');

jest.mock('axios');

const { getSingleProductDataFromUrl } = require("../crawlerService")
const testData = require("./parisResponse")

describe("Should crawl single page", function() {
  it("should get info from a url and get name and price", async function() {
    const url = "http://foo.bar/product1";
    const crawlerPaths = {
        pricePath: "string(//div[@class='item-price offer-price price-tc cencosud-price-2']/text())",
        skuPath: "string(//p[@class='pull-right']/text())"
    }

    axios.get.mockImplementationOnce(() => Promise.resolve({data: testData}));
    
    const result =  await getSingleProductDataFromUrl(url, crawlerPaths);

    expect(axios.get).toHaveBeenCalledWith('http://foo.bar/product1');
    expect(result.price).toBe("179990");
    expect(result.sku).toBe("505664999");
  });

});
