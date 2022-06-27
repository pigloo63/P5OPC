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
      totalPrice += parseInt(element.price);
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
  let modifyText = document.getElementById("cart__items")

  modifyText.innerHTML += 
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
}



function quantityChange() 
{
  document.querySelector('input[class=itemQuantity]').addEventListener('change', (modify) => {
    if(modify > element.number){
      let modifyNumber = modify.target.value;
      let productChange = JSON.parse(localStorage.getItem('stock'))
    }
  })
}