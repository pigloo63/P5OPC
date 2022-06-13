/*Récupération de l'URL de la page*/
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
console.log(id); /*Affichage de l'id de la page*/

let url ="http://localhost:3000/api/products";

/*On récupère les données de l'API et on appel la fonction pour afficher les détails*/
fetch(url)
    .then((response) => 
        response.json())
            .then((produits) => { 
                affichageProduit(produits);
            })
    .catch((error) => console.log("Pas de réponse de l'API"));


/*Fonction servant à afficher le produit en fonction de son ID*/
function affichageProduit(canap) {
    /*Déclaration des variable pour l'affichage*/
    let image = document.querySelector("article div.item__img");
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let description = document.querySelector('#description');
    let colorchoose = document.querySelector('#colors');
    /*Réalisation d'une boucle perméttant de dire que si l'ID du produit est
    strictement égal à l'ID de la page, alors on affiche l'élément*/
    for (Kanap of canap){
        if (id === Kanap._id) {
            image.innerHTML = `<img src="${Kanap.imageUrl}" alt="${Kanap.altTxt}">`;
            title.textContent = `${Kanap.name}`;
            price.textContent = `${Kanap.price}`;
            description.textContent = `${Kanap.description}`;
            for (color of Kanap.colors){
                colorchoose.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
    }
};