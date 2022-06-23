/*On prend les valeur de l'api*/
let url ="http://localhost:3000/api/products";

fetch (url)
    .then((response) =>
            response.json())
    .then((products) => { 
      console.log(products)
        /*Application de la fonction pour introduire les élément dans le panier*/
        insertStore(products)
    })
    .catch((error) =>
            console.log("Pas de réponse de l'API"));

/*Création de la fonction qui détermine les conditions d'affichage du panier */
function insertStore (data){
    /*Création variable pour garder en mémoire les éléments sélectionné à partir de l'API en récupérant les données convertit*/
    let panier = JSON.parse(localStorage.getItem("stock"))
    /*vérification que le contenue du panier soit différent de 0*/
    if (panier && panier.length != 0) {
        /*Création de la condition et vérification clef/valeur*/
        for (element of panier) {
            for (let f = 0, l = data.length; f < l; f++) {
                /*on vérifie l'égalité stricte*/
                if (element.id === data[f]._id){
                    /*Création des valeurs pour l'affichage*/
                    element.name = data[f].name;
                    element.prix = data[f].price;
                    element.image = data[f].imageUrl;
                    element.desription = data[f].description;
                    element.alt = data[f].altTxt;
                }
            }
        }
        display(panier);
    }  else { /*Si aucun élément on indique les qu'aucune quantité n'est présente*/
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
    }
};

function display(data) {
//Variable pour aller chercher les éléments à modifier
let modifyText = document.querySelector("#cart__items")
//modification des valeurs 
modifyText.innerHTML += data.map((element) => 
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
).join("");
}