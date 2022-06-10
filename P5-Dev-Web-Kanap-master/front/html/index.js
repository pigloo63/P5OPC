let url ="http://localhost:3000/api/products";

fetch(url)
    .then((response) => 
        response.json()
            .then((data) => { /*Search all items in the API and get promise*/
                for (let eltData of data){ 
                    var part = document.getElementById("items");
                    var templt = part.children[0].cloneNode(true);
                    
                    /*Inserting api values*/
                    templt.href = './product.html?id=' + eltData._id;
                    templt.getElementsByTagName('img')[0].src = eltData.imageUrl;
                    templt.getElementsByClassName('productName')[0].textContent = eltData.name;
                    templt.getElementsByClassName('productDescription')[0].textContent = eltData.description;

                    part.appendChild(templt);
                };
                part.children[0].remove();
            })
    .catch((error) => console.log("Pas de réponse de l'API"))
);


