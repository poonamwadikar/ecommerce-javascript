import { createHorizontalProductCard } from "./createHorizontalProductCard.js";

const wishlistContainer = document.getElementById("wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Remove product from wishlist
wishlistContainer.addEventListener("click", (event) => {
  const productId = event.target.dataset.id;

  if (event.target.innerText === "Remove") {
    wishlist = wishlist.filter(({ _id }) => _id !== productId);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    wishlistContainer.innerHTML = "";

    createHorizontalProductCard(wishlist, wishlistContainer);
  }
});


// Display wishlist products
createHorizontalProductCard(wishlist, wishlistContainer);
console.log("Clicked Wishlist");
console.log(productId);
console.log(product);