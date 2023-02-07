/**
     KravFör godkänt betyg (G)
 
     * 1.Alla produkter från det öppna API:et visas på webbplatsen med all data omvarje produkt. 
 
     * 2.Det går att beställa produkter(genom att klicka på “köp”-knapp)och användaren ska då behövaskicka 
        med namn, e-post, adress samt välja fraktvillkor(det ska inte gå att skicka beställningar utan att 
        all data har angetts. Produktens id skickas med automatiskt).Beställningar skickas med API till en 
        egen databas i Google Firebase där de lagras.
 
        * 3.En admin-sida skapas som använder Firebase API för att kunna se, ändra och ta bort ordrar. 
        Anslutningen till Firebase ska vara säker (cors och/eller autentisering)

        * 4.Källkoden versionshanteras med Github.
 
        * 5.Webbplatsen publiceras.
 
    För väl godkänt betyg (VG)Alla krav för godkänt, samt:

    * 1.Det går att visa alla produkter baserat pårespektive kategori

    * 2.Det är möjligt för en användare att beställa flera produkter samtidigt(via produkternas “köp”/”lägg 
    i varukorgen”-knappar).

    * 3.En varukorgssida listar alla produkter(med minst produktnamnoch pris)som valts med möjlighet att 

    * ta bort produkter innan beställning. Om webbsidan laddas om ska produkterna 
    fortfarande finnas kvar i varukorgen.

    * 4.En ikon för varukorgenvisar hur många produkter som ligger i varukorgen. 

    InlämningUppgiften lämnas in inlämningslådan på kurswebbplatsen Totara:1.All din källkod i en komprimerad mapp (ZIP-fil)2.Länk till publicerad webbplats3.Länk till publicerat repositorypå Github
    */

"use strict";

const productsEl = document.getElementById("products");
const menEl = document.getElementById("men");
const basketlistEl = document.getElementById("basketlist");
const basketEl = document.getElementById("basket");
const subtotalEl = document.getElementById("subtotal");
const totalItemsInCartEl = document.getElementById("totalitemsincart");

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json1 => renderJson(json1));

function renderJson(json1) {
    let products = json1;
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));

    productsEl.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let price = products[i].price;
        let productId = products[i].id;
        // console.log("json:",jsonobject);
        // console.log("values: ", values);

        if (category === "men's clothing") {
            productsEl.innerHTML += `
            <div class="card-group">
            <div class='card' style="width: 18rem;">
            <img class="class="card-img-top" src="${productImage}" max-height=775px>
           <div class="card-img-overlay">
            <img src="add-to-cart.png" class="float-end rounded-circle" id='a1' width=60px; height=60px; style="background-color: rgba(41, 219, 160, 0.74);"  role="button" onclick='addToCart(${productId}); showBasket()'>
            </div>
                <div class="card-body d-flex flex-column mb-3 justify-content-end">
               
                <div class="p-2"><p class="card-text d-inline-block text-truncate" style="max-width: 18rem;"><b>${productTitle}</b></p></div>
               
                </div>
                <div class="card-footer" style="">
                <b>${price}</b></div>
                </div>
                </div>`;
        }
    }
    ;
}

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
console.log("cart", cart);
console.log("cart.length", cart.length);

if (cart.length < 1) {
    basketEl.className = "invisible";

} else {
    basketEl.className = "";

}
updateCart();

//functions

function addToCart(id) {
    let productsLocal = localStorage.getItem("products");
    let products = JSON.parse(productsLocal);
    console.log("products: ", products);
    console.log(id);

    //check if product already exists in cart
    if (cart.some((item) => item.id === id)) {
        alert("Product already in cart")
    }
    else {
        const item = products.find((product) => product.id === id)
        // console.log(item);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
        console.log(cart);
    }
    updateCart();
}
//update cart
function updateCart() {
    renderCartItems();
    renderSubTotal();

    //sace cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubTotal() {
    let totalPrice = 0, totalItems = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML =
        `
     
    <tr>
     <td><b><Em>Subtotal(${totalItems} items): $${totalPrice.toFixed(2)}</em></b></td>
    </tr>     
    `
    totalItemsInCartEl.innerHTML = totalItems;
};

// render cart items
function renderCartItems() {
    basketlistEl.innerHTML = "";
    cart.forEach((item) => {
        basketlistEl.innerHTML +=
            `
           <td><img src="${item.image}" alt="${item.title}" onclick="removeItemFromCart(${item.id})" style="max-width: 100px"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
           <td><a id='a1' role="button" class='btn btn-success' onclick="changeNumberOfUnits('minus', ${item.id})">-</a></td>
           <td>${item.numberOfUnits}</td><td><a id='a1' role="button" 
           class='btn btn-success' onclick="changeNumberOfUnits('plus', ${item.id})">+</a></td>
        `
    });
}
//change number of units for an item

function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        console.log(item.numberOfUnits);
        let numberOfUnits = item.numberOfUnits;
        console.log(numberOfUnits);
        console.log("item.id: ", item.id);
        console.log("id: ", id);
        if (item.id === id) {
            console.log("action: ", action);
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
                console.log("numberOfUnits: ", numberOfUnits);
            } else if (action === "plus") {
                numberOfUnits++;
            }
        }
        console.log("item", item);
        return {
            ...item,
            numberOfUnits,
        }
    });

    updateCart();
}
// remove item from cart
function removeItemFromCart(id) {
    console.log("removeItemFromCart");
    cart = cart.filter((item) => item.id !== id);
    if (cart.length === 0) {
        basketEl.className = "invisible"
    }

    updateCart();
}
function showBasket() {
    console.log("showBasket");
    basketEl.className = "";

}