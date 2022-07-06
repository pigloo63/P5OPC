const params = new URLSearchParams(document.location.search);
let numCommand = params.get("commande")
console.log(numCommand)

if(numCommand){
document.getElementById('orderId').textContent = numCommand 
sessionStorage.clear();
localStorage.clear()
}

