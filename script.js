// Modal elements
const bookingForm = document.getElementById('booking');
const modal = document.getElementById('resultsModal');
const closeBtn = document.querySelector('.modal-close');

// Show modal on search submit
bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  modal.style.display = 'block';
});

// Close modal on X click
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});



// ==========================
// CART POPUP
// ==========================
document.querySelector(".cart-btn").addEventListener("click", () => {
  const cartItemsList = document.getElementById("cartItems");
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
        saveCart(); // update localStorage
        document.querySelector(".cart-btn").click(); // refresh popup
      });
    });
  }

  document.getElementById("cartPopup").style.display = "flex";
});

// Close cart popup
document.querySelector(".close-cart").addEventListener("click", () => {
  document.getElementById("cartPopup").style.display = "none";
});

// Close cart popup if click outside
window.addEventListener("click", (e) => {
  if (e.target.id === "cartPopup") {
    document.getElementById("cartPopup").style.display = "none";
  }
});