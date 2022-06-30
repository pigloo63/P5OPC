const page = document.location.href;

(() => {
  displayStore()
})()
/**
 * @brief affiche les éléments présent dans le stock
 */
function displayStore()
{
  let totalPrice = 0;
  let totalQuantity = 0;

  let products = JSON.parse(localStorage.getItem("stock"))
  for (element of products) {
    totalPrice = parseInt(element.price);
    totalQuantity += parseInt(element.number)
    display(element)
  }

  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice;
  
  }

/**
 * @brief Affiche les éléments 
 * @param {*} element 
 */
function display(element) 
{

  let replaceElement = document.createElement('div')
  replaceElement.innerHTML =
  `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
  <div class="cart__item__img">
    <img src="${element.image}" alt="${element.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${element.name}</h2>
      <p>${element.color}</p>
      <p>${element.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.number}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`
  
  let parent = document.getElementById("cart__items")
  parent.appendChild(replaceElement.firstChild)
  parent.lastChild.querySelector('input[name=itemQuantity]').addEventListener('change', (newNumber) => quantityChange(element.id, newNumber))
  
  parent.lastChild.querySelector(".cart__item .deleteItem").addEventListener('click', () => deleteArticle(element.id))
}

/**
 * @brief Ajoute un élément de celui désiré dans le localStorage
 * @params id, newNumber id de l'élément et le nouveau nombre à prendre en compte
 */
function quantityChange(id, newNumber) 
{
  let products = JSON.parse(localStorage.getItem("stock"))
  let productFound = products.find(e => e.id == id)
  if(productFound){
    productFound.number = newNumber.target.value
    localStorage.stock = JSON.stringify(products)
  }
}

/**
 * @brief Supprime l'élément voulue
 * @return Recharge la page lorsque l'élément a été supprimé
 * @params id de l'élément
 */
function deleteArticle(id)
{
  let products = JSON.parse(localStorage.getItem("stock"));
  let productFound = products.find(e => e.id == id);
  if(productFound){
    for(i = 0; i < products.length; i++){
      if(products[i].id == id){
        products.splice([i], 1)
        localStorage.stock = JSON.stringify(products)
      }
    }
  }
  return location.reload();
}

