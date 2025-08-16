document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const btn = document.querySelector(".btn-submit");

  if (!form || !btn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop actual form submission

    // Save form data or send via fetch/ajax here if needed
    // Example: console.log("Form submitted");

    // Change button text to "Message Sent"
    const originalText = btn.textContent;
    btn.textContent = "Message Sent!";
    btn.disabled = true;
    btn.style.backgroundColor = "#28a745"; // green success color

    // Reset back after 3 seconds
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.backgroundColor = ""; // resets to CSS default
      form.reset(); // clear fields if you want
    }, 3000);
  });
});
