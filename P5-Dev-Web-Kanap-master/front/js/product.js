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


//Création d'une variable afin d'ajouter les éléments nécessaire au fur et à mesure 
let article ={};

article.id = id; //id du produit


/*Fonction servant à afficher le produit en fonction de son ID*/
function affichageProduit(canap) {
    /*Déclaration des variable pour l'affichage*/
    let image = document.querySelector("article div.item__img");
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let description = document.querySelector('#description');
    let colorChoose = document.querySelector('#colors');
    /*Réalisation d'une boucle perméttant de dire que si l'ID du produit est
    strictement égal à l'ID de la page, alors on affiche l'élément*/
    for (Kanap of canap){
        if (id === Kanap._id) {
            image.innerHTML = `<img src="${Kanap.imageUrl}" alt="${Kanap.altTxt}">`;
            title.textContent = `${Kanap.name}`;
            price.textContent = `${Kanap.price}`;
            description.textContent = `${Kanap.description}`;

            //Vérification des couleur présent dans l'array par une boucle
            for (color of Kanap.colors){
                colorChoose.innerHTML += `<option value="${color}">${color}</option>`;
            }
        }
    }
};


//On vérifie la couleur choisie par l'utilisateur
let colorChoose = document.querySelector("#colors");
//On écoute l'événement et on récupère ca valeur dans une variable
colorChoose.addEventListener('input', (colorArticle) => {
    let colorDefined;
    // Récupération de la valeur 
    colorDefined = colorArticle.target.value;
    //On ajoute la couleur au panier
    article.color = colorDefined;
    console.log(colorDefined);
    }
);

//Idem pour la quantité de produit
let numberChoose = document.querySelector("input[id=quantity]");
//On écoute l'événement et on récupère ca valeur dans une variable
numberChoose.addEventListener('input', (numberArticle) => {
    let numberDefined;
    // Récupération de la valeur 
    numberDefined = numberArticle.target.value;
    //On ajoute la couleur au panier
    article.number = numberDefined
    console.log(numberDefined)
    }
);

//On regarde maintenant la validation au niveau du clic
//On définie la variable clic
let clic = document.querySelector("button[id=addToCart]")
//On écoute ce qui ce passe au momment du clic
clic.addEventListener('click', () => {
    //Condition pour valider la commande (qu'il y ai au moins 1 élément dans le panier et au moins une couleur de définie) 
    if(
        article.number < 1 ||
        article.number === undefined ||
        article.color === undefined 
    ){
    //indique si les champs ne sont pas remplie
    alert ('Veuillez remplir la couleur et le nombre de canapé désiré')
    }
    else {
    // ajout de la fonction qui remplira le panier
        store();
        console.log("clic ok")
    }
});

//Création des tableaux sui serviront à ajouter les produits 

//Création d'un tableau qui sauvegardera les données acquise et permettra de les transformé en JSON
let additionArticle = [];
// Création d'un tableau qui seraa ce qu'on récupère du localStorage
let productsSave = [];
//Création d'un tableau pour ajouter d'autre produit
let otherProducts = [];
//Création d'un tableau qui permettra de concaténer otherProducts et  productsSave
let insertElement = [];

//function qui va ajouter les produits dans le tableaux vierge
function additionAllArticles() {
    console.log(productsSave)
    //Si 'productsSave' est nul c'est qu'il n'à pas été créé
    if (productsSave === null) {
    //on rajoute les éléments dans le tableaux qu'on vient ensuite transformer en JSON
    additionArticle.push(article);
    console.log(additionArticle);
    //On envoie les élément de la classe 'article' dans le local storage sous JSON nomé 'stock'
    return (localStorage.stock = JSON.stringify(additionArticle));
    }
};

//La fonction insertOthersProducts va permettre d'ajouter d'autre produit si le panier n'est pas vide
function insertOthersProducts() {
    //On initialise le tableaux en le vidant des éléments pouvant déjà être présent
    insertElement = [];
    //On va tous simplement rajouter les élément de 'article' dans le JSON nomé 'stock'
    otherProducts.push(article);
    //On concatène insertElement et otherProducts
    insertElement = [...productsSave, ...otherProducts];
    //on réinitialise otherProducts cu qu'il a été utilisé
    otherProducts = [];
    //Il n'y à plus qu'a envoyé dans le local storage
    return (localStorage.stock = JSON.stringify(insertElement));

};

//fonction qui permet d'ajouter les élément dans le local storage, et de vérifier si il y des doublons sur la même commande, si il n'y a pas de produit créer le tableaux ou le rajoute.
function store() {
    //définition du local storage qui aurra comme variable 'stock' qui sera quelles sont les valeurs récupéré sous forme de JSON
    productsSave = JSON.parse(localStorage.getItem("stock"));
    //Vérification si il n'y a pas de doublon dans le stock
    //Si 'productsSave' existe
    if (productsSave){
        for (let choice of productsSave){
            //vérification que l'id et la couleur du produit ne sont pas déjà présent dans 'productsSave
            if (choice.id === id && choice.couleur === article.color){
                //On joue une alerte pour que l'utilisateur fasse les modifications directement dans le panier
                alert ("Vous avez déjà choisie cet article. Vous pouvez modifier ca quantité directement dans le panier")
            }
        }
        //On ajoute le produits dans le tableau si il existe.
        return insertOthersProducts;
    }
    //Sinon on créé un nouveaux tableaux
    return additionAllArticles
};
