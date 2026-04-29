/* =========================
   PRODUCT DATA
========================= */
const products = [
  { id: 1, name: "Latest Kits", price: 50 },
  { id: 2, name: "Previous Seasons", price: 40 },
  { id: 3, name: "Vintage Collection", price: 60 }
];

/* =========================
   CART SETUP
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */
function addToCart(name) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.name === name);
    if (product) {
      cart.push({ ...product, qty: 1 });
    }
  }

  updateCart();
}

/* =========================
   UPDATE CART COUNT
========================= */
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCount = document.querySelector(".cart span");
  if (cartCount) {
    cartCount.innerText = count;
  }
}

/* =========================
   SEARCH FILTER
========================= */
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();

      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

/* =========================
   MENU TOGGLE (NEW)
========================= */
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) {
    nav.classList.toggle("active");
  }
}

/* =========================
   CONNECT BUTTONS
========================= */
document.querySelectorAll(".card").forEach(card => {
  const title = card.querySelector("h2")?.innerText;
  const btn = card.querySelector("button");

  if (btn && title) {
    btn.addEventListener("click", () => {
      addToCart(title);
    });
  }
});

/* =========================
   INIT
========================= */
updateCart();