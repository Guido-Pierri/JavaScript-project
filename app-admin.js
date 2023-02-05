"use strict";
fetch("https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders")
    .then(res => res.json())
    .then(json => renderJson(json))


const h1El = document.getElementById("h1");

const formEl = document.getElementById("form");

const basketlistEl = document.getElementById("basketlist");

const changeItemEl = document.getElementById("changeItem");
const changePriceEl = document.getElementById("changePrice");
const changeQtyEl = document.getElementById("changeQty");
const changeCustomerEl = document.getElementById("changeCustomer");
const changeAdressEl = document.getElementById("changeAdress");
const changeDeliveryEl = document.getElementById("changeDelivery");
const changeEmailEl = document.getElementById("changeEmail");

function renderJson(json) {
    let orders = json;
    console.log("orders: ", orders);
    console.log("order.documents: ", orders.documents);
    console.log("orders.documents[0].fields", orders.documents[0].fields);
    let ordersArray = orders.documents;
    console.log("ordersArray: ", ordersArray);
    for (let i = 0; i < ordersArray.length; i++) {
        
        let orderName = ordersArray[i].name;
        console.log("orderName: ", orderName);
        
        let orderId = orderName.slice(66);
        console.log("orderId: ", orderId);
        
        let orderDate = ordersArray[i].fields.date.timestampValue;
        console.log("orderDate: ", orderDate);
        
        let orderDate1 = new Date(orderDate);
        console.log("orderDate1: ", orderDate1);
        
        let orderShipping = ordersArray[i].fields.shippingMethod.stringValue;
        console.log("orderShipping: ", orderShipping);
        
        let orderPrice = JSON.parse(ordersArray[i].fields.orderTotalPrice.stringValue);
        console.log("orderPrice; ", orderPrice);
        orderPrice = orderPrice.orderTotalPrice;
        console.log("orderPrice; ", orderPrice);

        let orderProducts = JSON.parse(ordersArray[i].fields.products.stringValue);
        console.log("orderProducts", orderProducts);
        let order = "";
        for (let j = 0; j < orderProducts.length; j++) {
            order += `Item id: ${orderProducts[j].id}, ${orderProducts[j].title}, `;
            // console.log("order", order);
            
        }
            console.log("order", order);
        let orderAdress = ordersArray[i].fields.adress.stringValue;
        let customerName = ordersArray[i].fields.userName.stringValue;
        let email = ordersArray[i].fields.email.stringValue;

        basketlistEl.innerHTML +=
            `
            <tr>
            <td>${customerName}</td>
            <td>${orderId}</td>
            <td>${order}</td>
            <td>${orderPrice}</td>
            <td>${email}</td>
            <td>${orderAdress}</td>
            <td>${orderShipping}</td>
            <td><button onclick='deleteOrder("${orderId}")'>Delete order</button>
            <td><button onclick='modifyOrder("${orderId}")'; >Modify order</button>

            <br>
            `
            ;
    }
}
function deleteOrder(orderId) {
    alert("deleteOrder");

    let url = "https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders/" + orderId;
    console.log("url:", url);
    fetch(url, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(data => console.log(data));
    setTimeout(reload, 2000);
};

function modifyOrder(orderId) {
    showForm();
    alert("modifyOrder ");
    let adress = changeAdressEl.value;
    let price = changePriceEl.value;
    let quantity = changeQtyEl.value;
    let frakt = changeDeliveryEl.value;
    let email = changeEmailEl.value;
    let itemNumber = changeItemEl.value;

    let url = "https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders/" + orderId;
    console.log("url:", url);
    fetch(url)
        .then(res => res.json())
        .then(json => renderJson(json));

    function renderJson(json) {
        let data = json;
        console.log("data: ", data);
        console.log("data.fields: ", data.fields);
        let userName = data.fields.userName.stringValue;
        let date = data.fields.date.timestampValue;


        if (!quantity || !frakt || !price || !adress || !email || !itemNumber) {
            alert("You must fill in all parameters to modify an order")
            return
        }
        const body = JSON.stringify({
            "fields": {
                "userName": {
                    "stringValue": userName
                },
                "email": {
                    "stringValue": email
                },
                "products": {
                    "arrayValue": {
                        "values": [
                            {
                                "stringValue": itemNumber
                            },
                            {
                                "stringValue": quantity
                            }
                        ]
                    }
                },
                "price": {
                    "stringValue": price
                },
                "date": {
                    "timestampValue": date
                },
                "shippingMethod": {
                    "stringValue": frakt
                },
                "adress": {
                    "stringValue": adress
                }


            }


        });

        url = "https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders/" + orderId;
        console.log("url:", url);
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    // setTimeout(reload,2000)
}


function reload() {
    console.log("reload() körs");
    location.reload();
}
function finnishOrder() {
    location.assign("http://127.0.0.1:5500/order.html")
}

function showForm() {
    console.log("show form");
    formEl.removeAttribute("class")
}


