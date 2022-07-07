const page = document.location.href;

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
* @brief permet l'affichage des élément au fur et à mesure du remplissage du champ
* @param {*} regex regex qui servira pour la vérification des caractères
* @param {*} pointage zone ou les élements devront être inséré
* @param {*} zoneEcoute 
*/
function textInformation (regex, pointage, zoneEcoute)
{
zoneEcoute.addEventListener('input', (e) => {
  valeur = e.target.value;
  index = valeur.search(regex);
  if(valeur === "" && index != 0){
    document.querySelector(pointage).textContent = "Veuillez renseigner ce champ"
    document.querySelector(pointage).style.color = "white"
  } else if (valeur !== "" && index != 0){
    document.querySelector(pointage).textContent = "reformuler cette donnée"
    document.querySelector(pointage).style.color = "white"
  } else{
    document.querySelector(pointage).textContent = "Champ accepté"
    document.querySelector(pointage).style.color = "white"
  }
})
}

//Vérification des condition d'écriture dans les champs
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

/**
 * @brief check si les url demandés sont présentent, vérifie si leur contenue est correctement écrit et les insert dans un JSON nommé 'contact' et envoie les données
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

  isContactValid['Prénom '] = regexText.test(contact.firstName); 
  isContactValid['Nom'] =  regexText.test(contact.lastName);
  isContactValid['Adresse'] =  regexAddress.test(contact.address); 
  isContactValid['Ville'] =  regexText.test(contact.city);
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
  send()
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
