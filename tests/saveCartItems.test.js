const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifique se ao executar saveCartItems(cartItem) o localStorage.setItem e chamado', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();  
  })

  it('Verifique se ao executar saveCartItems(cartItem) o localStorage.setItem e chamado com os parametros cartItems e um argumento', () => {
    const parametro = 'cartItem';
    saveCartItems(parametro);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', parametro);  
  })

});
