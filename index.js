import { products } from "./db/products.js";
import { createProductCard } from "./createProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

const productContainer = document.getElementById("products");
const filterContainer = document.querySelector(".side-bar");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

productContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  // If the click wasn't on a button, do nothing
  if (!button) return;
  const productId = button.dataset.id;
  const isProductInCart = findProductInCart(cart, productId);

  if (!isProductInCart) {
    const productToAddToCart = products.find(
      ({ _id }) => _id === productId
    );

    cart.push(productToAddToCart);

    localStorage.setItem("cart", JSON.stringify(cart));

    button.innerHTML = `
      Go To Cart
      <span class="material-icons-outlined">shopping_cart</span>
    `;
  } else {
    location.href = "cart.html";
  }
});


filterContainer.addEventListener("click", (event) => {
  const updatedProducts = products.filter(
    ({ rating }) => rating >= Number(event.target.dataset.rating)
  );
  productContainer.innerHTML = "";
  createProductCard(
    updatedProducts,
    productContainer,
    findProductInCart,
    "products"
  );
});

createProductCard(products, productContainer, findProductInCart, "products");
