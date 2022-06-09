let url ="http://localhost:3000/api/products";

/*Search all items in the API and get promise*/
fetch(url)
    .then((response) => 
    response.json().then((data) => {
        let lenghtArray = 8;
        for (let eltData of data){
            if ( i = 0, i<lenghtArray, i++);
            console.log(eltData)
        };
    })
    .catch((error) => console.log("Pas de réponse de l'API"))
);