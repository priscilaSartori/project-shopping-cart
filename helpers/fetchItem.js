const fetchItem = async (ItemID) => {
  const baseUrl = `https://api.mercadolibre.com/items/${ItemID}`;
  const result = await fetch(baseUrl)
    .then((response) => response.json())
    .then((dados) => dados)
    .catch((error) => error);
    
    return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
