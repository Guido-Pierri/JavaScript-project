/**
     KravFör godkänt betyg (G)
 
     * 1.Alla produkter från det öppna API:et visas på webbplatsen med all data om varje produkt. 
 
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
const productsElSm = document.getElementById("products2");
const menEl = document.getElementById("men");
const basketlistEl = document.getElementById("basketlist");
const basketEl = document.getElementById("basket");
const subtotalEl = document.getElementById("subtotal");
const totalItemsInCartEl = document.getElementById("totalitemsincart");
const carticonEl = document.getElementById("carticon");
const checkoutbuttonEl = document.getElementById("checkoutbutton");
const modalEl = document.getElementById("modal");
const modalBasketEl = document.getElementById("offcanvasWithBothOptions");


console.log(localStorage.getItem("USD"));
getRate();
function getRate() {
    fetch('https://api.valuta.se/api/sek/rates/')
        .then(res => res.json())
        .then(data => render(data));

    function render(rates) {
        console.log(rates);
        let arr = rates;
        console.log("arr", arr);
        console.log("arr", arr[4].value);
        localStorage.setItem("USD", (arr[4].value) / 100);
    }
}

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json1 => renderJson(json1))
    .catch(error => console.log(error));

function renderJson(json1) {
    let products = json1;
    console.log(products);
    localStorage.setItem('products', JSON.stringify(products));

    productsEl.innerHTML = "";
    productsElSm.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;

        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;

        productsEl.innerHTML += `
        <div class="col-sm-6">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start d-flex flex-column">
        <div class="card-title d-flex flex-column">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        productsElSm.innerHTML += `
        <div class="col-sm-6">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start d-flex flex-column">
        <div class="card-title d-flex flex-column">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        modalEl.innerHTML +=
            `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
}
;
function renderAllProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    productsEl.innerHTML = "";
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;

        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;
        // console.log("json:",jsonobject);
        // console.log("values: ", values);

        // if (category === "electronics") {
        productsEl.innerHTML += `
        <div class="col-6 col-md-6 col-lg-4 mb-3">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start">
        <div class="card-title">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;

        modalEl.innerHTML +=
            `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
}
function renderMens() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    productsEl.innerHTML = "";
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;

        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;

        if (category === "men's clothing") {
            productsEl.innerHTML += `
        <div class="col-6 col-md-6 col-lg-4 mb-3">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start">
        <div class="card-title">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        }
            modalEl.innerHTML +=
                `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
}
function renderWomens() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    productsEl.innerHTML = "";
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;

        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;

        if (category === "women's clothing") {
            productsEl.innerHTML += `
        <div class="col-6 col-md-6 col-lg-4 mb-3">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start">
        <div class="card-title">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        }
        modalEl.innerHTML +=
            `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
}
function renderJewelery() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    productsEl.innerHTML = "";
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;
        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;
        if (category === "jewelery") {
            productsEl.innerHTML += `
        <div class="col-6 col-md-6 col-lg-4 mb-3">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start">
        <div class="card-title">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div>
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        }
        modalEl.innerHTML +=
            `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
}
function renderElectronics() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    productsEl.innerHTML = "";
    console.log(products.length)
    for (let i = 0; i < products.length; i++) {
        let productTitle = products[i].title;
        let productImage = products[i].image;
        let description = products[i].description;
        let category = products[i].category;
        let rate = products[i].rating.rate;
        let count = products[i].rating.count;

        let price = products[i].price * localStorage.getItem("USD");
        price = price.toFixed(0);
        let productId = products[i].id;
        // console.log("json:",jsonobject);
        // console.log("values: ", values);

        if (category === "electronics") {
            productsEl.innerHTML += `
        <div class="col-6 col-md-6 col-lg-4 mb-3">
        <div class="card h-100 border border-0 m-3">
        <img src="${productImage}" class="card-img"  alt="${productTitle}" style="height: 300px; width: 100%; object-fit: contain;" role="button" data-bs-toggle="modal" data-bs-target="#picturemodal${i}" title="click learn more about this product">
        <div class="card-body text-start">
        <div class="card-title">
        <p class="card-text  text-truncate" style="max-width: 250px;"><b>${productTitle}</b></p>
        <div class="d-flex justify-content-between">
        <div class="d-flex "><p class="align-self-center mb-0">
        <b>${price} kr.</b></div>
        </p><img class="align-self-center" src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" height="20px"
            aria-controls="offcanvasWithBothOptions" onclick="addToCart(${productId}); showBasket()">
         </div><br>         
         </div>
         
         </div>
         <div class="card-footer d-flex justify-content-evenly bg-body border-0"></div>
        </div>
        
        </div>
        
        </div>
            `;
        }
        modalEl.innerHTML +=
            `
        <div class="modal fade" id="picturemodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${productTitle}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img class= "card-img-top" src="${productImage}" width="100%">
                        <p>${description}</p>
                        <p>Rating: ${rate}, Count: ${count}<p>
                        
                    </div>
                    <div class="modal-footer">

                    <button type="button" class="btn btn-light rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" 
                    onclick="addToCart(${productId}); showBasket()">Add to basket
                    <img  src="resourses/images/add-to-cart.png" title="add to your cart" id='a1' role="button" height="20px"></button>
                        <button type="button" class="btn btn-light rounded-0" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
        `}
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
showCartIcon();
//functions

function addToCart(id) {

    let productsLocal = localStorage.getItem("products");
    let products = JSON.parse(productsLocal);
    console.log("products: ", products);
    console.log(id);
    basketEl.scrollIntoView();

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
    showCartIcon();


    //sace cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubTotal() {
    let totalPrice = 0, totalItems = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.numberOfUnits * localStorage.getItem("USD");
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML =
        `
    
        <div  class="d-flex align-self-flex-end"><p class="m-0"><b><Em>Subtotal(${totalItems} items): ${totalPrice.toFixed(0)} kr.</em></b></p>
        </div>
        <a href="resourses/html/checkout.html"><button id="checkoutbutton" class="btn btn-secondary p-1 h-100 w-100 rounded-0"><b><em>Proceed to checkout</em></b></button></a>
        `
    totalItemsInCartEl.innerHTML = totalItems;
};

// render cart items
function renderCartItems() {
    basketlistEl.innerHTML = "";
    cart.forEach((item) => {
        let price = item.price * localStorage.getItem("USD");
        price = price.toFixed(0);
        basketlistEl.innerHTML +=
            `
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" onclick="removeItemFromCart(${item.id})">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg></td>
            <td><img src="${item.image}" alt="${item.title}" onclick="removeItemFromCart(${item.id})" style="max-width: 50px" title="click to remove the item from the cart"></td>
            <td>${item.title}</td>
            <td><b>${price} kr.</b></td>
            <td><a id='a1' role="button" class="btn btn-light rounded-circle" onclick="changeNumberOfUnits('minus', ${item.id})">-</a></td>
            <td><b>${item.numberOfUnits}</b></td><td><a id='a1' role="button" 
            class='btn btn-light rounded-circle' onclick="changeNumberOfUnits('plus', ${item.id})">+</a></td>
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
    showCartIcon();
    emptyCart();

}
function showBasket() {
    console.log("showBasket");
    basketEl.className = "";

}
function showCartIcon() {

    if (cart.length < 1) {
        carticonEl.className = "visually-hidden";

    } else {
        carticonEl.className = "visible d-flex position-relative";

    }
}
function emptyCart() {
    if (cart.length === 0) {
        modalBasketEl.innerHTML = `<p>Your basket is empty</p>
        <p><a role="button" class="btn btn-secondary p-1 rounded" id="sendButton" onclick="localStorage.clear()" href="./index.html">Continue shopping</a></p>`
    }
}