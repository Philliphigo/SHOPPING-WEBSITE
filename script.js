// Sample product data
const products = [
  { id: 1, name: "T-Shirt", price: 5000, img: "tshirt.jpg" },
  { id: 2, name: "Hoodie", price: 10000, img: "hoodie.jpg" },
  { id: 3, name: "Cap", price: 3000, img: "cap.jpg" },
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
      <button type="submit">Submit Order</button>
    </form>
  `;
}

// Submit order
function submitOrder(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const payment = document.querySelector("#payment").value;

  alert(`Thank you, ${name}! Your order has been placed. We will contact you on ${phone}. Payment Method: ${payment}.`);
  
  // Clear cart and reset page
  cart = [];
  updateCartDisplay();
  document.querySelector(".checkout").innerHTML = "<h2>Thank you for shopping with us!</h2>";
}
