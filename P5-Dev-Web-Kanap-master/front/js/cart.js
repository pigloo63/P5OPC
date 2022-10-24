const page = document.location.href;
let url ="http://localhost:3000/api/products";

(() => {
  displayQuantity();
  display()
  validationForm()
})()


/**
 * @brief affiche les éléments présent dans le stock
 */
function displayQuantity()
{
  let totalQuantity = 0;

  let products = JSON.parse(localStorage.getItem("stock"))
  for (element of products){
    totalQuantity += parseInt(element.number)
  }
  document.getElementById("totalQuantity").textContent = totalQuantity; 
}


/**
 * @brief Affiche les éléments, ajoute ou supprime les éléments, calcul le total
 * @param {*} element 
 */
function display() 
{ 
  fetch(url)
  .then((response) => response.json()
  .then((data) => {
    let products = JSON.parse(localStorage.getItem("stock"));
    for(let element of data){
      for(let eltProducts of products){
        if(element._id == eltProducts.id){
          let replaceElement = document.createElement('div')
          replaceElement.innerHTML =
          `<article class="cart__item" data-id="${eltProducts.id}" data-color="${eltProducts.color}">
          <div class="cart__item__img">
            <img src="${eltProducts.image}" alt="${eltProducts.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${eltProducts.name}</h2>
              <p>${eltProducts.color}</p>
              <p>${element.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${eltProducts.number}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
          </article>`
          
          let parent = document.getElementById("cart__items")
        
          parent.appendChild(replaceElement.firstChild)
        
          parent.lastChild.querySelector('input[name=itemQuantity]').addEventListener('change', (newNumber) => quantityChange(eltProducts.id, newNumber))
          
          parent.lastChild.querySelector(".cart__item .deleteItem").addEventListener('click', () => deleteArticle(eltProducts.id))
          
        }
        
      }
    }
    total(data, products)
  })
  .catch((error) => console.log("Pas de réponse de l'API"))
  );
}

/**
 * @brief Ajoute un élément de celui désiré dans le localStorage
 * @return Recharge la page lorsque le nombre à été ajouté
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
function total(data, products)
{
  let sum = 0;
  let additionalSum = 0
  for(let elementData of data){
    for(let elementProduct of products){
      if(elementData._id == elementProduct.id){
        let multiplyPriceProduct = elementData.price * elementProduct.number
        sum = multiplyPriceProduct
        additionalSum += sum
        console.log(sum)     
      }
    }

  }
  document.getElementById("totalPrice").textContent = additionalSum;
}


/**
* @brief permet l'affichage des élément au fur et à mesure du remplissage du champ
* @param {*} regex regex qui servira pour la vérification des caractères
* @param {*} pointage zone ou les élements devront être inséré
* @param {*} zoneEcoute 
*/
function textInformation (regex, pointage, zoneEcoute)
{
zoneEcoute.addEventListener('input', (e) => {
  valeur = e.target.value;
  console.log(e.target)
  index = valeur.search(regex);
  var button = document.querySelector('.cart__order__form__submit')
  if(valeur === "" && index != 0){
    document.querySelector(pointage).textContent = "Veuillez renseigner ce champ"
    document.querySelector(pointage).style.color = "white"
  } else if (valeur !== "" && index != 0){
    document.querySelector(pointage).textContent = "Reformuler cette donnée"
    document.querySelector(pointage).style.color = "white"
    button.style.display='none'
  } else{
    document.querySelector(pointage).textContent = "Champ accepté"
    document.querySelector(pointage).style.color = "white"
    button.style.display='flex'
  }
})
}



/**
 * @brief check si les url demandés sont présentent, vérifie si leur contenue est correctement écrit et les insert dans un JSON nommé 'contact' et envoie les données
 */
function validationForm()
{
  
  var regexText = /^[A-Za-z]{1,60}$/;
  var regexAddress = /^[\w-\s]{1,100}$/;
  var regexEmail = /^[\w.-]+@[\w-.]+.\w{2,4}$/

  let firstName = document.getElementById('firstName');
  let lastName = document.getElementById('lastName');
  let address = document.getElementById('address');
  let city = document.getElementById('city');
  let email = document.getElementById('email')

  textInformation(regexText, '#firstNameErrorMsg', firstName)
  textInformation(regexText, '#lastNameErrorMsg', lastName)
  textInformation(regexAddress, '#addressErrorMsg', address)
  textInformation(regexText, '#cityErrorMsg', city)
  textInformation(regexEmail, '#emailErrorMsg', email)

  let contact = {
    firstName : firstName,
    lastName : lastName,
    address : address,
    city : city,
    email : email,
  };

    

  if(contact.firstName.accept != "",
    contact.lastName.accept != "",
    contact.city.accept != "",
    contact.email.accept != "",
    contact.address.accept != ""
  ){
    console.log('ok')
    localStorage.setItem("contact", JSON.stringify(contact));
    document.getElementById('order').addEventListener('click', () => {
      send()
    })
  }
  
}

/**
 * @brief cherche les id pour les intégrer dans un tableau; ajoute les éléments dans la variable 'finalCommand' pour l'envoyer vers l'API; prend la réponse de l'API pour trouver le n° de commande
 */
function send ()
{
  let contact = JSON.parse(localStorage.getItem('contact'));
  let productsSave = JSON.parse(localStorage.getItem('stock'));
  let finalCommand;
  let idStore = [];
  if (productsSave && contact) {
    for(let element of productsSave){
      idStore.push(element.id);
    }
  }
  finalCommand = {
    contact:{
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      city: contact.city,
      email: contact.email,
    },
    products: idStore
  }
  console.log(finalCommand);

  if (idStore.length != 0 && contact != null) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalCommand),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.href = `confirmation.html?commande=${data.orderId}`;
      })
      .catch(error => console.log("Pas de réponse de l'API"));
  }
};
