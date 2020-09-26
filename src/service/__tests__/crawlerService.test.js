"use strict";
const axios = require('axios');

jest.mock('axios');

const { getSingleProductDataFromUrl } = require("../crawlerService")
const testData = require("./parisResponse")

describe("Should crawl single page", function() {
  it("should get info from a url and get name and price", async function() {
    const url = "http://foo.bar/product1";
    let thenFn = jest.fn();
 

    axios.get.mockImplementationOnce(() => Promise.resolve({data: testData}));
    
    const result =  await getSingleProductDataFromUrl(url);

    expect(axios.get).toHaveBeenCalledWith('http://foo.bar/product1');
    expect(result.price).toBe("179990");
    expect(result.sku).toBe("505664999");
  });

});
