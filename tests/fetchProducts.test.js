require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { expect } = require('@jest/globals');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifique se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');  
  })

  it('Verifique se a função fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();  
  })

  it('Verifique se a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');  
  })

  it('Verifique se o retorno da função fetchProducts com o argumento (computador) é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const prodComputador = await fetchProducts('computador');
    expect(prodComputador).toEqual(computadorSearch);
  })

  it('Verifique se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: (You must provide an url)', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'))
  })
});
