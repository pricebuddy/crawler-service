const getAllySellers = async (repositories) => {
  const response = await repositories.sellerRepository.selectAllies();
  return response;
};

const getCompetitorSellers = async (repositories) => {
  const response = await repositories.sellerRepository.selectCompetitors();
  return response;
};

module.exports = { getAllySellers, getCompetitorSellers };
