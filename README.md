Proposed model:

Marketplaces/Tenant: {
    falabella,
    linio,
}

- Sellers
    - id
    - name
    - url

- My Sellers
    - id
    - idSeller

- masteProduct
    - id
    - nombre
    - thumbnailUrl

- childProduct
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

- Rules

---

Stock - zone - product - shippingPrice

A futuro availability zones por producto:

availabilityZones: {
    {
        zone: RM,
        shippingPrice: 12
    }
    {
        zone: 1,
        shippingPrice: 8
    }
}