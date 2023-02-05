"use strict";
const productsEl = document.getElementById("products");
const menEl = document.getElementById("men");
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

        const pEl = document.getElementById("p1");
        if (category === "jewelery") {
            productsEl.innerHTML += `
            <div class='card' style="width: 18rem;"> 
            <figure class="figure card border border-white"> 
            <img class="class="card-img-top img-fluid rounded border border-white" src="${productImage}">
            </figure> 
            <div class='card-body'> 
            <h5 class="card-title">${productTitle}</h5>
            <p id='p1' class='card-text description-text'>
            ${description}
            </p>
            <a id='a1' class='btn btn-success description-btn' onclick='addToCart(${productId});'><b>Buy this product<br>
                    ${price}</b></a>
                     </div>
                </div>`;
        }
    }
    ;
}

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];

updateCart();

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
}
//remove item from cart
function removeItemFromcart(id) {
    cart = cart.filter((item) => item.id !== id)
    updateCart();
}
// render cart items
function renderCartItems() {
    basketEl.innerHTML = "";
    cart.forEach((item) => {
        basketEl.innerHTML +=
            `
           <td><img src="${item.image}" class="img-fluid" alt="${item.title}" onclick="removeItemFromCart(${item.id})"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
           <td><a id='a1' class='btn btn-success description-btn' onclick="changeNumberOfUnits('minus', ${item.id})">- </a></td>
           <td>${item.numberOfUnits}</td><td><a id='a1' class='btn btn-success description-btn' onclick="changeNumberOfUnits('plus', ${item.id})">+</a></td>
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
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}