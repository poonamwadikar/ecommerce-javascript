import { createHorizontalProductCard } from "./createHorizontalProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

let cartContainer = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartContainer.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  const productId = event.target.dataset.id;

  if (!action) return;

  // Remove button
  if (action === "remove") {
    cart = cart.filter(({ _id }) => _id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    cartContainer.innerHTML = "";
    createHorizontalProductCard(cart, cartContainer);
  }

  // Save To Wishlist button
  if (action === "wishlist") {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const product = cart.find(({ _id }) => _id === productId);

    if (!wishlist.some(({ _id }) => _id === productId)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist");
    } else {
      alert("Already in Wishlist");
    }
  }
});

const cartLength = document.querySelector(".item-count");
cartLength.innerText = JSON.parse(localStorage.getItem("cart")).length;

const productPrice = document.querySelector(".product-price");
const priceAfterDiscount = JSON.parse(localStorage.getItem("cart")).reduce(
  (acc, cur) => acc + cur.newPrice,
  0,
);
productPrice.innerText = priceAfterDiscount;

const discount = document.querySelectorAll(".discounted-amount");

const priceBeforeDiscount = JSON.parse(localStorage.getItem("cart")).reduce(
  (acc, cur) => acc + cur.oldPrice,
  0,
);

const discountedAmount = priceBeforeDiscount - priceAfterDiscount;
for (let element of discount) {
  element.innerText = discountedAmount;
}

const totalAmount = document.querySelector(".total-amount");
totalAmount.innerText = priceAfterDiscount - discountedAmount + 100;

createHorizontalProductCard(cart, cartContainer, findProductInCart, "cart");
