const { getAllSellers } = require('../get-sellers');

const mockDomainRepositories = {
  sellerRepository: {
    selectAll: jest.fn(),
  },
};

describe('Should crawl single page', () => {
  it('should process seller products', async () => {
    const sellers = [
      {
        id: 'foo',
      },
      {
        id: 'foo',
      },
    ];

    mockDomainRepositories.sellerRepository.selectAll.mockReturnValue(sellers);

    await getAllSellers(mockDomainRepositories);

    expect(mockDomainRepositories.sellerRepository.selectAll).toHaveBeenCalled();
  });
});
