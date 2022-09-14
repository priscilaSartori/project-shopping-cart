const saveCartItems = (param) => {
  localStorage.setItem('cartItems', JSON.stringify(param));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
