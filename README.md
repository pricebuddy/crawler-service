Run tests:

`npm run test`

Run app locally:

`npm start`

How to build docker image locally:

`docker build -t crawler-service .`

How to run using docker locally:

`docker run --init -p 3000:3000 -e "MONGO_HOST=host.docker.internal" crawler-service`




Proposed model:

Marketplaces/Tenant: {
    falabella,
    linio,
}

- Tenant
    - id
    - name
    - url
    - country

- My Sellers
    - id
    - idSeller

- masterProduct
    - id
    - nombre
    - thumbnailUrl

- sellerProduct
    - id: 123
    - sku: 000
    - masteProductId
    - precio costo (no sabremos de competidor o de seller, pero se puede actualizar manual(?))
    - precio actual
    - url
    - sellerId: 1
    - isAvailable
    - createdAt
    - lastModifiedAt

- Precio envios
    - id
    - idSeller
    - zona
    - precio
    - isAvailable

- Crawler paths
    - id
    - pricePath
    - skuPath
    - sellerId

---

Stock - zone - product - shippingPrice

- A futuro availability zones por producto:

availabilityZones: {
    {
        zone: RM,
        shippingPrice: 12 // Del producto
    },
    {
        zone: 1,
        shippingPrice: 8
    }
}

- No estamos considerando variantes
