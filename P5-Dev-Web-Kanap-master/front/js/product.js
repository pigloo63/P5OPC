const params = new URLSearchParams(document.location.search);
console.log(params);
let id = params.get("id");
console.log(id);

const url ="http://localhost:3000/api/products";

fetch(url)
    .then(response => response.json())
    .then((products) => displayProduct(products.find(e => params.get("id") == e._id)))
    .catch((error) => console.log("Pas de réponse de l'API"));

/**
 * @brief Affiche l'élément passé en paramètre
 * @param {*} products le produit affiché, si nul ne fait rien
 */
function displayProduct(product)
{
    if (!product)
        return
  
    document.querySelector("article div.item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    document.getElementById('title').textContent = `${product.name}`;
    document.getElementById('price').textContent = `${product.price}`;
    document.getElementById('description').textContent = `${product.description}`;

    let colorChoose = document.querySelector('#colors');
    for (color of product.colors){
        colorChoose.innerHTML += `<option value="${color}">${color}</option>`;
    }
}

/**
 * @brief Récupère les éléments (couleur et nombre), au moment du clic
 * @returns un objet contenant l'id, le nombre et la couleur de l'article courant
 */
function retrieveArticle() {
    return {
        id : params.get("id"),
        number : document.querySelector("input[id=quantity]").value,
        color : document.getElementById("colors").value,
        price : document.getElementById('price').textContent,
        image : document.querySelector("article div.item__img img").src,
        name : document.getElementById('title').textContent,
        description : document.getElementById('description').textContent,
    }
}

document.querySelector("button[id=addToCart]").addEventListener('click', () => {
    let article = retrieveArticle()
    console.log (article)
    if (article.number == 0 || article.number > 100 || article.color == undefined) {
        alert ('Veuillez remplir la couleur et/ou le nombre de canapé désiré et/ou vous ne pouvez pas commander plus de 100 canapés')
    }
    else {
        store(article);
        console.log("clic ok")
    }
});

/**
 * @brief Ajoute l'élément choisie dans le local storage
 * @details Vérifie si il y a doublon, dans ce cas ajoute la quantité à l'élément existant sinon le rajoute au localstorage
 * @param {*} article Article courant à ajouter 
 */
function store(article) 
{
    let productsSave = JSON.parse(localStorage.getItem("stock"));

    if (productsSave) {
        let product = productsSave.find(e => e.id == article.id && e.color == article.color)

        if (product){
            product.number = parseInt(article.number) + parseInt(product.number)
            alert('Le produit à bien été ajouté');
        }
        else{
            productsSave.push(article);
            alert('Le produit à bien été ajouté');
        }
    }
    else {
       productsSave=[article];
       alert('Le produit à bien été ajouté');
    }

    localStorage.setItem("stock", JSON.stringify(productsSave));
};
