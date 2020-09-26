const getAllSellers = async (repositories) => {
  const response = await repositories.sellerRepository.selectAll();
  return response;
};

module.exports = { getAllSellers };
