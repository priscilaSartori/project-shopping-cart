// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const ol = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
let cont = 0;
totalPrice.innerText = `Total R$ ${cont}`;

/** Função responsável por criar e retornar o elemento de imagem do produto.
* @param {string} imageSource - URL da imagem.
* @returns {Element} Elemento de imagem do produto.
*/
const createProductImageElement = (imageSource) => {
const img = document.createElement('img');
img.className = 'item__image';
img.src = imageSource;
return img;
};

/** Função responsável por criar e retornar qualquer elemento.
* @param {string} element - Nome do elemento a ser criado.
* @param {string} className - Classe do elemento.
* @param {string} innerText - Texto do elemento.
* @returns {Element} Elemento criado.
*/
const createCustomElement = (element, className, innerText) => {
const e = document.createElement(element);
e.className = className;
e.innerText = innerText;
return e;
};

/** Função responsável por criar e retornar o elemento do produto.
* @param {Object} product - Objeto do produto.
* @param {string} product.id - ID do produto.
* @param {string} product.title - Título do produto.
* @param {string} product.thumbnail - URL da imagem do produto.
* @returns {Element} Elemento de produto.
*/
const createProductItemElement = ({ id, title, thumbnail }) => {
const section = document.createElement('section');
section.className = 'item';
section.appendChild(createCustomElement('span', 'item_id', id));
section.appendChild(createCustomElement('span', 'item__title', title));
section.appendChild(createProductImageElement(thumbnail));
section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
return section;
};

/** Função que recupera o ID do produto passado como parâmetro.
* @param {Element} product - Elemento do produto.
* @returns {string} ID do produto.
*/
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/** Função que subtrai a soma dos valores no carrinho */
const subCar = (evento) => {
const valor = evento.split('|')[2].split('$')[1];
cont -= valor;
totalPrice.innerText = `Total R$ ${cont}`;
};

/** Função responsável por remover item do carrinho */
const cartItemClickListener = (event) => {
event.target.remove();
saveCartItems(ol.innerHTML);
subCar(event.target.innerText);
};

/** Função responsável por criar e retornar um item do carrinho.
* @param {Object} product - Objeto do produto.
* @param {string} product.id - ID do produto.
* @param {string} product.title - Título do produto.
* @param {string} product.price - Preço do produto.
* @returns {Element} Elemento de um item do carrinho.
*/
const createCartItemElement = ({ id, title, price }) => {
const li = document.createElement('li');
li.className = 'cart__item';
li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
li.addEventListener('click', cartItemClickListener);
return li;
};

/** Função que adiciona a soma dos valores no carrinho */
const sumGetPrice = (array) => {
const valor = array.split('$')[1];
cont += Number(valor);
totalPrice.innerText = `Total R$ ${cont}`;
};

/** Função que adiciona a soma dos valores no carrinho */
const sumPrice = ({ price }) => {
  cont += price;
  totalPrice.innerText = `Total R$ ${cont}`;
};

/** Função responsável por adicionar item no carrinho e no localStorage */
const itemCarrinho = async (event) => {
const itemId = event.target.parentNode.firstChild.innerText;
const produto = await fetchItem(itemId);
const pushCarrinho = createCartItemElement(produto);
ol.appendChild(pushCarrinho);
saveCartItems(ol.innerHTML);
sumPrice(produto);
};

/** Função responsavel por trazer para a tela as informações do localStorage no total */
const updateSum = async () => {
  const li = document.querySelectorAll('li');
  li.forEach((item) => sumGetPrice(item.innerText));
};

/** Função responsavel por trazer para a tela as informações do localStorage */
const updateCart = async () => {
  const produtosCarrinho = await getSavedCartItems();
  ol.innerHTML = produtosCarrinho;
  const li = document.querySelectorAll('li');
  li.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

/** Função que retira a mensagem depois da requisição da API */
const removeLoading = async () => {
 const span = document.querySelector('.loading');
 await span.parentElement.removeChild(span);
};
 
/** Função responsável por listar os produtos na página */
const listaProdutos = async () => {
const items = document.querySelector('.items');
const produto = await fetchProducts('computador');
produto.results.forEach((prod) => {
  const newProduct = {
    id: prod.id,
    title: prod.title,
    thumbnail: prod.thumbnail,
  };
  const product = createProductItemElement(newProduct);
  product.querySelector('.item__add').addEventListener('click', itemCarrinho);
  items.appendChild(product);
});
removeLoading();
};

/** Função responsável por apagar todos os itens do carrinho */
document.querySelector('.empty-cart').addEventListener('click', () => {
cont = 0;
totalPrice.innerText = `Total R$ ${cont}`;
ol.innerHTML = '';
localStorage.clear();
});
 
/** Função que exibe uma mensagem durante uma requisição à API */
const loading = async () => {
 const span = document.createElement('span');
 const container = document.querySelector('.container');
 span.className = 'loading';
 span.innerText = 'Carregando...';
 container.parentElement.insertBefore(span, container);
 listaProdutos();
};
 
window.onload = () => {
 updateCart();
 updateSum();
 loading();
};
