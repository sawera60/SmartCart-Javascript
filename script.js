// ====== DOM Elements ======
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");

const favoritesBtn = document.querySelector(".favorites");
const cartIcon = document.querySelector(".cart");
const allProductsCategory = document.querySelector(".all-products");
const furnitureCategory = document.querySelector(".furniture");
const electronicsCategory = document.querySelector(".electronics");
const clothingCategory = document.querySelector(".clothing");

const productsSection = document.querySelector(".products-section");
const productCards = document.querySelectorAll(".product");
const addCartBtns = document.querySelectorAll(".add-to-cart-btn"); // multiple buttons

let cart = [];

// ====== SEARCH FUNCTION ======
function showAllProducts() {
  const inputValue = input.value.trim().toLowerCase();
  if (!inputValue) {
    productCards.forEach((card) => (card.style.display = "block"));
    return;
  }

  productCards.forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(inputValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ====== CATEGORY FILTERS ======
function showFurnitureonly() {
  productCards.forEach((card) => {
    const category = card.querySelector(".product-category").textContent.toLowerCase();
    card.style.display = category === "furniture" ? "block" : "none";
  });
}

function showElectronicsonly() {
  productCards.forEach((card) => {
    const category = card.querySelector(".product-category").textContent.toLowerCase();
    card.style.display = category === "electronics" ? "block" : "none";
  });
}

function showClothingonly() {
  productCards.forEach((card) => {
    const category = card.querySelector(".product-category").textContent.toLowerCase();
    card.style.display = category === "clothing" ? "block" : "none";
  });
}

function showAllCategories() {
  productCards.forEach((card) => (card.style.display = "block"));
}

function showAddtoCart(productCard) {
  const name = productCard.querySelector(".product-name").textContent;
  const price = productCard.querySelector(".product-price").textContent;
  const category = productCard.querySelector(".product-category").textContent;

  const product = { name, price, category };
  cart.push(product);

  const div = document.createElement("div");
  div.classList.add("order-summary");
  div.innerHTML = `
    <h2>Order Summary</h2>
    <p><strong>Item:</strong> ${name}</p>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Total Amount:</strong> ${price}</p>
    <button>Confirm your order</button>
  `;
  document.body.appendChild(div);
}


searchBtn.addEventListener("click", showAllProducts);
allProductsCategory.addEventListener("click", showAllCategories);
furnitureCategory.addEventListener("click", showFurnitureonly);
electronicsCategory.addEventListener("click", showElectronicsonly);
clothingCategory.addEventListener("click", showClothingonly);

addCartBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product");
    showAddtoCart(productCard);
  });
});


favoritesBtn.addEventListener("click", () => {});
cartIcon.addEventListener("click", () => {});
