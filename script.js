// Sample product data
const products = [
  { id: 1, name: "T-Shirt", price: 10000, img: "copilot_image_1731973074719.jpeg" },
  { id: 2, name: "Hoodie", price: 20000, img: "copilot_image_1731973222276.jpeg" },
  { id: 3, name: "Cap", price: 30000, img: "copilot_image_1731973176064.jpeg" },
  { id: 1, name: "Longsleeves", price: 50000, img: "copilot_image_1731973074719.jpeg" },
];

// Cart array
let cart = [];

// Add event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartDisplay();
});

// Display products dynamically
function displayProducts() {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = products
    .map(
      (product) => `
    <div class="product">
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>MK ${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `
    )
    .join("");
}

// Add product to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
  const cartSection = document.querySelector(".cart");
  const cartItems = cart
    .map(
      (item) => `
    <div class="cart-item">
      <p>${item.name} x ${item.quantity} - MK ${(item.price * item.quantity).toLocaleString()}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartSection.innerHTML = `
    <h2>Your Cart</h2>
    ${cartItems || "<p>Your cart is empty.</p>"}
    <h3>Total: MK ${total.toLocaleString()}</h3>
    ${
      cart.length > 0
        ? '<button onclick="checkout()">Proceed to Checkout</button>'
        : ""
    }
  `;
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
}

// Checkout process
function checkout() {
  const checkoutSection = document.querySelector(".checkout");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  checkoutSection.innerHTML = `
    <h2>Checkout</h2>
    <form onsubmit="submitOrder(event)">
      <div>
        <label for="name">Full Name:</label>
        <input type="text" id="name" required>
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" required>
      </div>
      <div>
        <label for="payment">Payment Method:</label>
        <select id="payment" required>
          <option value="TNM Mpamba">TNM Mpamba</option>
          <option value="Airtel Money">Airtel Money</option>
        </select>
      </div>
      <h3>Total: MK ${total.toLocaleString()}</h3>
      <div>
        <label for="password">Enter 4-Digit Password for Payment:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  `;
}

// Submit order with payment confirmation
function submitOrder(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const payment = document.querySelector("#payment").value;
  const password = document.querySelector("#password").value;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simulate payment confirmation
  const walletBalance = 20000; // Example balance
  const paymentAmount = total;

  if (walletBalance < paymentAmount) {
    alert("Insufficient funds. Please add money to your wallet.");
    return;
  }

  if (payment === "Airtel Money" || payment === "TNM Mpamba") {
    alert(`Thank you, ${name}! Your order of MK ${paymentAmount} has been successfully placed. We will contact you at ${phone}. Payment Method: ${payment}`);
    
    // Optionally, send order confirmation email via a service like Formspree
    sendConfirmationEmail(name, phone, payment, total);

    // Clear cart and reset page
    cart = [];
    updateCartDisplay();
    document.querySelector(".checkout").innerHTML = "<h2>Thank you for shopping with us!</h2>";
  }
}

// Simulate sending confirmation email (this requires a service like Formspree)
function sendConfirmationEmail(name, phone, payment, total) {
  const orderDetails = {
    name,
    phone,
    payment,
    total
  };

  // Example Formspree API usage (replace URL with your Formspree URL)
  fetch("https://formspree.io/f/{your-form-id}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderDetails)
  })
  .then(response => response.json())
  .then(data => console.log("Order confirmation sent", data))
  .catch(error => console.error("Error sending confirmation:", error));
}

// Google Login functionality (using Firebase Authentication or Google OAuth)
function googleLogin() {
  // You'll need Firebase or OAuth setup for a working Google login
  alert("Google login is not yet integrated. Please use another authentication method.");
}
