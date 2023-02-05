/**
     KravFör godkänt betyg (G)
 
     * 1.Alla produkter från det öppna API:et visas på webbplatsen med all data omvarje produkt. 
 
     * 2.Det går att beställa produkter(genom att klicka på “köp”-knapp)och användaren ska då behöva skicka 
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
const introEl = document.getElementById("intro")
const sectionEl = document.getElementById("main-section");
const menEl = document.getElementById("men");
const womenEl = document.getElementById("women");
const electronicsEl = document.getElementById("electronics");
const jeweleryEl = document.getElementById("jewelery");
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json1 => console.log(json1))

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => renderJson(json))
function renderJson(json) {
    let products = json;
    console.log(products);
    // menEl.addEventListener("click", function showMensClothing() {
    //     introEl.innerHTML = "";
    //     sectionEl.innerHTML = "";
    //     for (let i = 0; i < products.length; i++) {
    //         let productTitle = products[i].title;
    //         let productImage = products[i].image;
    //         let description = products[i].description;
    //         let category = products[i].category;
    //         let price = products[i].price;
    //         let productId = products[i].id;
    //         let values = [productId, productTitle, price];
    //         console.log("values: ", values);

    //         console.log("productId: ",productId);
    //         const pEl = document.getElementById("p1");
    //         if (category === "men's clothing") {
    //             sectionEl.innerHTML += `<article class='card'> 
    //                 <div class='card-body'> 
    //                 <h5 class="card-title">${productTitle}</h5>
    //                  <figure class='figure card'> 
    //                 <img class="figure-img img-fluid rounded" width=100% src="${productImage}"> 
    //                 <p id='p1' class='card-text description-text'>
    //                 ${description}
    //                 <br>
    //                 </p>
    //                 <a id='a1' class='btn btn-success description-btn' onclick='getId("${productId}"); getTitle("${productTitle}"); getPrice("${price}")' href="basket.html"><b>Buy this product<br>
    //                 ${price}</b></a>
    //                  </div>
    //             </article>`;
    //         }
    //     }
    // });
    womenEl.addEventListener("click", function showWomensClothing() {
        introEl.innerHTML = "";
        sectionEl.innerHTML = "";
        for (let i = 0; i < products.length; i++) {
            
            let productTitle = products[i].title;
            let productImage = products[i].image;
            let description = products[i].description;
            let category = products[i].category;
            let price = products[i].price;
            
            if (category === "women's clothing") {
                sectionEl.innerHTML += `<article class='card'> 
                    <div class='card-body'> 
                    <h5 class="card-title">${productTitle}</h5>
                     <figure class='figure card'> 
                    <img class="figure-img img-fluid rounded" width=100% src="${productImage}"> 
                    <p id='p1' class='card-text description-text'>
                    ${description}
                    <br>
                    </p>
                    <a id='a1' class='btn btn-success description-btn' onclick='alerter(${price})'><b>Buy this product<br>
                    ${price}</b></a>
                     </div>
                </article>`;
            }
        }
    });
    jeweleryEl.addEventListener("click", function showJewelery() {
        introEl.innerHTML = "";
        sectionEl.innerHTML = "";
        for (let i = 0; i < products.length; i++) {
            
            let productTitle = products[i].title;
            let productImage = products[i].image;
            let description = products[i].description;
            let category = products[i].category;
            let price = products[i].price;

            if (category === "jewelery") {
                sectionEl.innerHTML += `<article class='card'> 
                    <div class='card-body'> 
                    <h5 class="card-title">${productTitle}</h5>
                     <figure class='figure card'> 
                    <img class="figure-img img-fluid rounded" width=100% src="${productImage}"> 
                    <p id='p1' class='card-text description-text'>
                    ${description}
                    <br>
                    </p>
                    <a id='a1' class='btn btn-success description-btn' onclick='alerter(${price})'><b>Buy this product<br>
                    ${price}</b></a>
                     </div>
                </article>`;
                
            }
        }
    });
    





    electronicsEl.addEventListener("click", function showElectronics() {
        introEl.innerHTML = "";
        sectionEl.innerHTML = "";
        
        for (let i = 0; i < products.length; i++) {
            console.log("products" + [i] + ".title: " + products[i].title);
            let productTitle = products[i].title;
            let productImage = products[i].image;
            let description = products[i].description;
            let category = products[i].category;
            let price = products[i].price;
            let productId = products[i].id;
            if (category === "electronics") {
                sectionEl.innerHTML += `<article class='card'> 
                    <div class='card-body'> 
                    <h5 class="card-title">${productTitle}</h5>
                     <figure class='figure card'> 
                    <img class="figure-img img-fluid rounded" width=100% src="${productImage}"> 
                    <p id='p1' class='card-text description-text'>
                    ${description}
                    <br>
                    </p>
                    <a id='a1' class='btn btn-success description-btn' onclick='alerter([${productId, productTitle, price}})'><b>Buy this product<br>
                    ${price}</b></a>
                     </div>
                </article>`;
            }
        }
    });
}
function getId(id) {
   
    console.log("id:", id);
    alert("The item is in the basket: "+ id);
    localStorage.setItem("id", id);   
}
function getTitle(title) {
    console.log("title: ", title);
    localStorage.setItem("title", title);
}
function getPrice(price) {
    console.log("price: ", price);
    localStorage.setItem("price", price);
}