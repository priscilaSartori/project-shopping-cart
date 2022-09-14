const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifique se ao executar getSavedCartItems(cartItem) o localStorage.getItem é chamado', () => {
    getSavedCartItems('cartItem');
    expect(localStorage.getItem).toHaveBeenCalled();  
  })

  it('Verifique se ao executar getSavedCartItems(cartItem) o localStorage.getItem e chamado com os parametros cartItems e um argumento', () => {
    getSavedCartItems(parametro);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');  
  })
});
