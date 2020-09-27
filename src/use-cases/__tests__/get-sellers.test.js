const { getCompetitorSellers } = require('../get-sellers');

const mockDomainRepositories = {
  sellerRepository: {
    selectCompetitors: jest.fn(),
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

    mockDomainRepositories.sellerRepository.selectCompetitors.mockReturnValue(sellers);

    await getCompetitorSellers(mockDomainRepositories);

    expect(mockDomainRepositories.sellerRepository.selectCompetitors).toHaveBeenCalled();
  });
});
