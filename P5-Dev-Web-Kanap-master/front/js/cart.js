(() => {
  displayStore();
  checkAndRetrieveFromUrl();
})()
/**
 * @brief affiche les éléments présent dans le stock
 */
function displayStore()
{
  let totalQuantity = 0;

  let products = JSON.parse(localStorage.getItem("stock"))
  for (element of products){
    totalQuantity += parseInt(element.number)
    display(element)
  }
  document.getElementById("totalQuantity").textContent = totalQuantity; 
}

/**
 * @brief Affiche les éléments, ajoute ou supprime les éléments, calcul le total
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

  total()
}

/**
 * @brief Ajoute un élément de celui désiré dans le localStorage
 * @params id, newNumber id de l'élément et le nouveau nombre à prendre en compte
 */
function quantityChange(id, newNumber) 
{
  let products = JSON.parse(localStorage.getItem("stock"))
  let productFound = products.find(e => e.id === id)
  if(productFound){
    productFound.number = newNumber.target.value
    localStorage.stock = JSON.stringify(products)
  }
  return location.reload();
}

/**
 * @brief Supprime l'élément voulue
 * @return Recharge la page lorsque l'élément a été supprimé
 * @params id de l'élément
 */
function deleteArticle(id)
{
  let products = JSON.parse(localStorage.getItem("stock"));
  let productIndex = products.findIndex(e => e.id === id);
  products.splice(productIndex, 1)
  localStorage.stock = JSON.stringify(products)
  return location.reload();
}

/**
 * @brief calcul du total
 */
function total()
{
  let products = JSON.parse(localStorage.getItem("stock"));
  let sum = 0;
  for(i = 0; i < products.length; i++){
    let multiplyPriceProduct = products[i].price * products[i].number - products[i].price
    sum += parseInt(products[i].price) + multiplyPriceProduct
    document.getElementById("totalPrice").textContent = sum;
  }
}

/**
 * 
 * @returns 
 */
function checkAndRetrieveFromUrl()
{
  const params = new URLSearchParams(document.location.search);

  let contact = {
    firstName : params.get('firstName'),
    lastName : params.get('lastName'),
    address : params.get('address'),
    city : params.get('city'),
    email : params.get('email'),
  };

  var regexText = /^[A-Za-z]{1,60}$/;
  var regexAddress = /^[\w-\s]{1,100}$/;
  var regexEmail = /^[\w.-]+@[\w-.]+.\w{2,4}$/

  if(contact.firstName == null &&
    contact.lastName == null &&
    contact.city == null &&
    contact.address == null &&
    contact.email == null)
    return

  let isContactValid = {};

  isContactValid['firstName'] = regexText.test(contact.firstName); 
  isContactValid['lastName'] =  regexText.test(contact.lastName);
  isContactValid['address'] =  regexAddress.test(contact.address); 
  isContactValid['city'] =  regexText.test(contact.city);
  isContactValid['email'] = regexEmail.test(contact.email);
  
  let errorMsg = 'Les valeurs suivantes sont invalides : '
  let element = true

  for ([key, value] of Object.entries(isContactValid)) {
    if (value == false) {
      element= false
      errorMsg += key + ' '
    }
  }
  if(element == false){
    alert(errorMsg)
    return
  }
  console.log('ok')

  localStorage.setItem("contact", JSON.stringify(contact));
}