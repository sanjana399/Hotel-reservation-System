// ==========================
// IMAGE SLIDER
// ==========================
document.querySelectorAll(".slider").forEach(slider => {
  let index = 0;
  const slideImages = slider.querySelector(".slide-images");
  const slides = slideImages.querySelectorAll("img");
  const totalSlides = slides.length;

  slider.querySelector(".slider-arrow.left").addEventListener("click", () => {
    index = (index > 0) ? index - 1 : totalSlides - 1;
    slideImages.style.transform = `translateX(-${index * 100}%)`;
  });

  slider.querySelector(".slider-arrow.right").addEventListener("click", () => {
    index = (index < totalSlides - 1) ? index + 1 : 0;
    slideImages.style.transform = `translateX(-${index * 100}%)`;
  });
});

// ==========================
// SMOOTH SCROLL TO HASH
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }
});

// ==========================
// BOOKING POPUP + CART (with localStorage persistence)
// ==========================

// Load cart from localStorage on page load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge initially
document.querySelector(".cart-badge").textContent = cart.length;

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.querySelector(".cart-badge").textContent = cart.length;
}

// Attach popup to all "Confirm Booking" buttons inside rooms
document.querySelectorAll(".room .btn").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const roomName = button.closest(".room").querySelector("h2").textContent;

    // Reset form + button state each time popup opens
    const bookingForm = document.getElementById("bookingForm");
    bookingForm.reset();
    const confirmBtn = bookingForm.querySelector(".confirm-btn");
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm";
    confirmBtn.style.background = "#00496C";

    // Store room name temporarily for this booking
    bookingForm.dataset.room = roomName;

    document.querySelector("#bookingPopup h2").textContent = `Confirm Your Booking: ${roomName}`;
    document.getElementById("bookingPopup").style.display = "flex";
  });
});

// Close booking popup
document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("bookingPopup").style.display = "none";
});

// Close booking popup if click outside
window.addEventListener("click", (e) => {
  if (e.target.id === "bookingPopup") {
    document.getElementById("bookingPopup").style.display = "none";
  }
});

// ==========================
// HANDLE BOOKING FORM SUBMIT
// ==========================
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;
  const confirmBtn = form.querySelector(".confirm-btn");

  // Disable immediately to prevent double-click
  confirmBtn.disabled = true;

  // Get booking details
  const booking = {
    room: form.dataset.room,
    name: form.name.value,
    phone: form.phone.value,
    checkin: form.checkin.value,
    checkout: form.checkout.value,
    adults: form.adults.value,
    children: form.children.value
  };

  // Add to cart
  cart.push(booking);
  saveCart(); // save to localStorage

  // Show thank-you message inside button
  confirmBtn.textContent = "✔ Thank you! Booking confirmed. We will call you shortly.";
  confirmBtn.style.background = "#10B981"; // green

  // Keep popup open for 3 seconds, then close & reset
  setTimeout(() => {
    document.getElementById("bookingPopup").style.display = "none";

    // Reset form & button for next time
    form.reset();
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm";
    confirmBtn.style.background = "#00496C";
  }, 3000);
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


