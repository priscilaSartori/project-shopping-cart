require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const { expect } = require('@jest/globals');

describe('2 - Teste a função fetchItem', () => {
  it('Verifique se fetchItem é uma função', async () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Verifique se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifique se a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Verifica se a função fetchItem retorna os dados do item "MLB1615760527"', async () => {
    const produto = await fetchItem('MLB1615760527');
    expect(produto).toEqual(item);
  })

  it('Verifique se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: (You must provide an url)', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'))
  })

});
