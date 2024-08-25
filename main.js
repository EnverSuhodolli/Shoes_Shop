const openShopping = document.querySelector(".shopping"),
  closeShopping = document.querySelector(".closeShopping"),
  body = document.querySelector("body"),
  list = document.querySelector(".list"),
  listCard = document.querySelector(".listCard"),
  total = document.querySelector(".total"),
  quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "PRODUCT 1",
    image: "1.png",
    price: 200,
  },
  {
    id: 2,
    name: "PRODUCT 2",
    image: "2.png",
    price: 220,
  },
  {
    id: 3,
    name: "PRODUCT 3",
    image: "3.png",
    price: 240,
  },
  {
    id: 4,
    name: "PRODUCT 4",
    image: "4.png",
    price: 260,
  },
  {
    id: 5,
    name: "PRODUCT 5",
    image: "5.png",
    price: 140,
  },
  {
    id: 6,
    name: "PRODUCT 6",
    image: "6.png",
    price: 180,
  },
];

let listCards = [];

const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src = "img/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}€</div>
            <button onclick = "addToCart(${key})">Add To Cart</button>
        `;
    list.appendChild(newDiv);
  });
};

initApp();

const addToCart = (key) => {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }

  reloadCart();
};

const reloadCart = () => {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src = "img/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}€</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>
            `;
      listCard.appendChild(newDiv);
    }

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
  });
};

const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCart();
};
