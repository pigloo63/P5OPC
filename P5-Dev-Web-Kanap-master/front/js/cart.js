/*On prend les valeur de l'api*/
let url ="http://localhost:3000/api/products";

fetch (url)
    .then((response) =>
            response.json())
    .then((produits) => { 
        /*Application de la fonction pour introduire les élément dans le panier*/
        ajoutPanier(produits)
    })
    .catch((error) =>
            console.log("Pas de réponse de l'API"));

/*Création de la fonction qui détermine les conditions d'affichage du panier */
function ajoutPanier (data){
    /*Création variable pour garder en mémoire les éléments sélectionné à partir de l'API en récupérant les données convertit*/
    let panier = JSON.parse(localStorage.getItem("stock"))
    /*vérification que le contenue du panier soit différent de 0*/
    if (panier && panier.lenght != 0) {
        /*Création de la condition*/
        for (elt of panier){
            for (let f = 0, l = data.lenght; f < l; f++){
                /*on vérifie l'égalité stricte*/
                if (elt._id === data[f]._id){
                    /*Création des valeurs pour l'affichage*/
                    elt.name = data[f].name;
                    elt.prix = data[f].price;
                    elt.image = data[f].imageUrl;
                    elt.desription = data[f].desription;
                    elt.alt = data[f].alttxt;
                }
            }
        }
    }  else { /*Si aucun élément on indique les qu'aucune quantité n'est présente*/
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
    }
};