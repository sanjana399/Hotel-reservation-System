// ==========================
// CART (Global, shared across all pages)
// ==========================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector(".cart-badge").textContent = cart.length;
}

// Update cart badge initially
document.addEventListener("DOMContentLoaded", () => {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = cart.length;
});

// CART POPUP
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.querySelector(".cart-btn");
  const cartPopup = document.getElementById("cartPopup");
  const cartItemsList = document.getElementById("cartItems");

  if (!cartBtn || !cartPopup) return; // only run if cart exists on this page

  cartBtn.addEventListener("click", () => {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<li>No bookings yet.</li>";
    } else {
      cart.forEach((b, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div style="padding:10px; border:1px solid #ddd; border-radius:8px; margin-bottom:10px;">
            <div><strong>Room:</strong> ${b.room}</div>
            <div><strong>Check-in:</strong> ${b.checkin}</div>
            <div><strong>Check-out:</strong> ${b.checkout}</div>
            <div><strong>Guests:</strong> ${b.adults} Adults, ${b.children} Children</div>
            <div style="text-align:center; margin-top:8px;">
              <button class="cancel-btn" data-index="${i}" style="background:#dc3545; color:#fff; border:none; padding:6px 12px; border-radius:5px; cursor:pointer;">
                Cancel
              </button>
            </div>
          </div>
        `;
        cartItemsList.appendChild(li);
      });

      // Cancel button removes from cart + save
      document.querySelectorAll(".cancel-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          saveCart();
          cartBtn.click(); // refresh popup
        });
      });
    }

    cartPopup.style.display = "flex";
  });

  // Close cart popup
  document.querySelector(".close-cart").addEventListener("click", () => {
    cartPopup.style.display = "none";
  });

  // Close cart popup if click outside
  window.addEventListener("click", (e) => {
    if (e.target.id === "cartPopup") {
      cartPopup.style.display = "none";
    }
  });
});
