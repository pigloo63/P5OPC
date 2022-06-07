/*Search all items in the API and get promise*/
async function itemsrequest() {
    fetch("http://localhost:3000/api/products")
        .then(function(items) {
            if (items.ok) {
                return items.json();
            }
        })
        .then(function(value) {
        })
        .catch(function(err){
        })
};


