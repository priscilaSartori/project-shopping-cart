const fetchProducts = async (QUERY) => {
  const baseUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const result = await fetch(baseUrl)
    .then((response) => response.json())
    .then((dados) => dados)
    .catch((error) => error);
    // console.log(result)
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
