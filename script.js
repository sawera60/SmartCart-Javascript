const input = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");
const cartIcon = document.querySelector(".cart");
const allProductsCategory = document.querySelector(".all-products");
const furnitureCategory = document.querySelector(".furniture");
const electronicsCategory = document.querySelector(".electronics");
const clothingCategory = document.querySelector(".clothing");
const productsSection = document.querySelector(".products-section");
const productCards = document.querySelectorAll(".product");
const addCartBtns = document.querySelectorAll(".add-to-cart-btn");
const orderSummarySection = document.querySelector(".order-summary-section"); // Cart summary container


const cartItemsContainer = document.getElementById('cart-items-container');
const totalPriceEl = document.getElementById('total-price');
const confirmOrderBtn = document.getElementById('confirm-order');
const clearCartBtn = document.getElementById('clear-cart');

let cart = []; 

function parsePrice(priceText) {
  
    let cleanedText = priceText.replace("Rs.", ""); //Remove the "Rs." prefix
    cleanedText = cleanedText.replace(",", ""); //Remove any commas (e.g., from "60,000")
    return parseInt(cleanedText.trim(), 10) || 0;  //Convert the resulting string to a whole number (integer)
}

function updateCartUI() {
  
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        orderSummarySection.classList.add('hidden');
    } else {
      
        orderSummarySection.classList.remove('hidden');

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity; 
            total += itemTotal;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            const formattedItemPrice = itemTotal.toLocaleString('en-IN'); 
            
            itemDiv.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span class="price-unit">Rs.</span>
                <span>${formattedItemPrice}</span>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }
    totalPriceEl.textContent = total.toLocaleString('en-IN'); 
}

// ADD TO CART FUNCTION 
function showAddtoCart(e) {
    const productCard = e.target.closest('.product');
    
    const name = productCard.querySelector(".product-name").textContent.trim();
    const priceText = productCard.querySelector(".product-price").textContent.trim();
    const price = parsePrice(priceText);
    
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartUI();
    
    e.target.textContent = 'Added!';
    setTimeout(() => {
        e.target.textContent = 'Add to cart';
    }, 800);
}


function showCartIcons() {
    orderSummarySection.classList.toggle('hidden');
}

function clearCart() {
    cart = [];
    updateCartUI();
    alert("Your cart has been cleared!");
}

function confirmOrder() {
    if (cart.length > 0) {
        alert(`Order confirmed! Your total is Rs.${totalPriceEl.textContent}. Items are getting ready!`);
    } else {
        alert("Your cart is empty. Please add items before confirming.");
    }
}


function showAllProducts() {
    const inputValue = input.value.trim().toLowerCase();
    if (!inputValue) {
        productCards.forEach((card) => (card.style.display = "block"));
        return;
    }

    productCards.forEach((card) => {
        const productName = card.querySelector(".product-name").textContent.toLowerCase();
        card.style.display = productName.includes(inputValue) ? "block" : "none";
    });
}

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

searchBtn.addEventListener("click", showAllProducts);
allProductsCategory.addEventListener("click", showAllCategories);
furnitureCategory.addEventListener("click", showFurnitureonly);
electronicsCategory.addEventListener("click", showElectronicsonly);
clothingCategory.addEventListener("click", showClothingonly);
addCartBtns.forEach((btn) => btn.addEventListener("click", showAddtoCart));
cartIcon.addEventListener("click", showCartIcons);
clearCartBtn.addEventListener("click", clearCart);
confirmOrderBtn.addEventListener("click", confirmOrder);

updateCartUI();