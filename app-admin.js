"use strict";
fetch("https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders")
    .then(res => res.json())
    .then(json => renderJson(json))


const h1El = document.getElementById("h1");

const formEl = document.getElementById("form");

const basketlistEl = document.getElementById("basketlist");

const changeidEl = document.getElementById("changeid");
const changePriceEl = document.getElementById("changePrice");
const changeproductsEl = document.getElementById("changeproducts");
const changeCustomerEl = document.getElementById("changeCustomer");
const changeAdressEl = document.getElementById("changeAdress");
const changeDeliveryEl = document.getElementById("changeDelivery");
const changeEmailEl = document.getElementById("changeEmail");

const modifybuttonEL = document.getElementById("modify");

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
        let orderProducts = (ordersArray[i].fields.products.stringValue);
        let tableContent = orderProducts;

        //create unordered list of products

        // let orderProducts = JSON.parse(ordersArray[i].fields.products.stringValue);
        // console.log("orderProducts", orderProducts);
        // var tableContent = '<ul class="list-group list-group-flush">';
        // for (let index = 0; index < orderProducts.length; index++) {
        //     tableContent += `<li>ITEM: ${orderProducts[index].title},</li>`;
        //     // nameCounter++;  // I don't know if this should be there, 
        //     // logically the counter should be incremented here as well?
        //     // total.innerHTML = "Total: " + nameCounter;
        // }
        // tableContent += '</ul>';
        // let order = "";
        // for (let j = 0; j < orderProducts.length; j++) {
        //     order += `Item nr${j + 1}:Item id: ${orderProducts[j].id}, ${orderProducts[j].title},
        //      `;
        //     // console.log("order", order);

        // }
        // console.log("order", order);
        let orderAdress = ordersArray[i].fields.adress.stringValue;
        let customerName = ordersArray[i].fields.userName.stringValue;
        let email = ordersArray[i].fields.email.stringValue;

        basketlistEl.innerHTML +=
            `
            <tr>
            <td>${orderId}</td>
            <td>${customerName}</td>
            <td>${orderAdress}</td>
            <td>${tableContent}</td>
            <td>${orderPrice}</td>
            <td>${email}</td>
            <td>${orderShipping}</td>
            <td><button onclick='deleteOrder("${orderId}")'>Delete order</button>
            <td><button onclick='showForm("${orderId}"), saveId("${orderId}")' >Modify order</button>

            <br>
            `
            ;
    }
}

function saveId(orderId) {
    console.log("orderId", orderId);
    localStorage.setItem("ID", orderId);
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




function reload() {
    console.log("reload() körs");
    location.reload();
}
function finnishOrder() {
    location.assign("/order.html")
}

function showForm(data) {
    console.log("show form");
    formEl.removeAttribute("class");
    changeCustomerEl.scrollIntoView();
    let orderId1 = data;
    console.log("orderId1:", orderId1);
    let url = "https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders/" + orderId1;
    fetch(url)
        .then(res => res.json())
        .then(json => renderJson2(json));

    function renderJson2(json) {
        console.log(json);
        changeCustomerEl.value = json.fields.userName.stringValue;
        changeAdressEl.value = json.fields.adress.stringValue;
        changeEmailEl.value = json.fields.email.stringValue;
        changeproductsEl.value = json.fields.products.stringValue;
        changePriceEl.value = JSON.parse(json.fields.orderTotalPrice.stringValue).orderTotalPrice;
        console.log(JSON.parse(json.fields.orderTotalPrice.stringValue).orderTotalPrice);
}

    function modifyOrder() {
        let orderId = localStorage.getItem("ID");
        console.log("orderID:", orderId);
        alert("modifyOrder ");
        let adress = changeAdressEl.value;
        let price = changePriceEl.value;
        let frakt = changeDeliveryEl.value;
        let email = changeEmailEl.value;
        let idNumber = changeidEl.value;
        let order = `[{${changeproductsEl.value}}]`;

        let userName = changeCustomerEl.value;

        let url = "https://firestore.googleapis.com/v1/projects/online-oasis-orders/databases/(default)/documents/orders/" + orderId;
        console.log("url:", url);
        fetch(url)
            .then(res => res.json())
            .then(json => renderJson(json));

        function renderJson(json) {
            let data = json;
            console.log("data: ", data);
            console.log("data.fields: ", data.fields);
            let date = data.fields.date.timestampValue;


            if (!userName || !frakt || !price || !adress || !email || !idNumber) {
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
                        "stringValue": order
                    },
                    "orderTotalPrice": {
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
    modifybuttonEL.addEventListener('click', modifyOrder)
}


