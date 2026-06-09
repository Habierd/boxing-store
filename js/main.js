(() => {
  "use strict";

  const storageKey = "boxingstore_cart";

  const PRODUCTS = [
    { id: 1, name: "Guantes Cleto Reyes Azul", brand: "Cleto Reyes", price: 320000, category: "guantes", image: "assets/images/products/guantes-cleto-reyes-azul.png", badge: "Premium" },
    { id: 2, name: "Guantes Green Hill Rojo", brand: "Green Hill", price: 185000, category: "guantes", image: "assets/images/products/guantes-green-hill-rojo.png" },
    { id: 3, name: "Guantes Max MMA Rosa", brand: "Max MMA", price: 145000, category: "guantes", image: "assets/images/products/guantes-max-mma-rosa.png" },
    { id: 4, name: "Guantes Piscator Zone Rosa", brand: "Piscator", price: 160000, category: "guantes", image: "assets/images/products/guantes-piscator-zone-rosa.png" },
    { id: 5, name: "Guantes Ringside Blanco Rojo", brand: "Ringside", price: 210000, category: "guantes", image: "assets/images/products/guantes-ringside-blanco-rojo.png" },
    { id: 6, name: "Guantes Ringside Dorado", brand: "Ringside", price: 230000, category: "guantes", image: "assets/images/products/guantes-ringside-dorado.png", badge: "Top" },
    { id: 7, name: "Guantes Ringside Dorado Negro", brand: "Ringside", price: 230000, category: "guantes", image: "assets/images/products/guantes-ringside-dorado-negro.png" },
    { id: 8, name: "Guantes Ringside Negro", brand: "Ringside", price: 210000, category: "guantes", image: "assets/images/products/guantes-ringside-negro.png" },
    { id: 9, name: "Guantes Ringside Negro Blanco", brand: "Ringside", price: 210000, category: "guantes", image: "assets/images/products/guantes-ringside-negro-blanco.png" },
    { id: 10, name: "Guantes Ringside Negro Rojo", brand: "Ringside", price: 215000, category: "guantes", image: "assets/images/products/guantes-ringside-negro-rojo.png" },
    { id: 11, name: "Guantes Ringside Rosa Negro", brand: "Ringside", price: 215000, category: "guantes", image: "assets/images/products/guantes-ringside-rosa-negro.png" },
    { id: 12, name: "Guantes Ringside Verde Dorado", brand: "Ringside", price: 220000, category: "guantes", image: "assets/images/products/guantes-ringside-verde-dorado.png" },
    { id: 13, name: "Guantes Rox Negro Fucsia", brand: "Rox", price: 175000, category: "guantes", image: "assets/images/products/guantes-rox-negro-fucsia.png" },
    { id: 14, name: "Guantes Sanabul Negro", brand: "Sanabul", price: 190000, category: "guantes", image: "assets/images/products/guantes-sanabul-negro.png" },
    { id: 15, name: "Guantes Twisto Blanco", brand: "Twisto", price: 140000, category: "guantes", image: "assets/images/products/guantes-twisto-blanco.png" },
    { id: 16, name: "Guantes Twisto Negro Blanco", brand: "Twisto", price: 140000, category: "guantes", image: "assets/images/products/guantes-twisto-negro-blanco.png" },
    { id: 17, name: "Guantes Twisto Rojo Blanco", brand: "Twisto", price: 140000, category: "guantes", image: "assets/images/products/guantes-twisto-rojo-blanco.png" },
    { id: 18, name: "Guantes Venum Blanco", brand: "Venum", price: 265000, category: "guantes", image: "assets/images/products/guantes-venum-blanco.png", badge: "Premium" },
    { id: 19, name: "Guantes Venum Blanco Plata", brand: "Venum", price: 270000, category: "guantes", image: "assets/images/products/guantes-venum-blanco-plata.png" },
    { id: 20, name: "Guantes Venum Negro", brand: "Venum", price: 265000, category: "guantes", image: "assets/images/products/guantes-venum-negro.png" },
    { id: 21, name: "Casco Rox Dorado Negro", brand: "Rox", price: 280000, category: "cascos", image: "assets/images/products/casco-rox-dorado-negro.png", badge: "Nuevo" },
    { id: 22, name: "Casco Rox Negro Dorado", brand: "Rox", price: 280000, category: "cascos", image: "assets/images/products/casco-rox-negro-dorado.png" },
    { id: 23, name: "Botas Apex Negro Plata", brand: "Apex", price: 350000, category: "botas", image: "assets/images/products/botas-apex-negro-plata.png", badge: "Nuevo" }
  ];

  const cartButton = document.getElementById("cartButton");
  const cartCount = document.getElementById("cartCount");
  const cartPanel = document.getElementById("cartPanel");
  const closeCart = document.getElementById("closeCart");
  const backdrop = document.getElementById("backdrop");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const clearCart = document.getElementById("clearCart");
  const cartWhatsapp = document.getElementById("cartWhatsapp");
  const filters = document.getElementById("filters");
  const productsGrid = document.getElementById("productsGrid");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const year = document.getElementById("year");
  const fxHit = document.getElementById("fx-hit");
  const fxKo = document.getElementById("fx-ko");
  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }

  function formatCOP(value) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  function showFX(type) {
    const element = type === "hit" ? fxHit : fxKo;
    if (!element) return;
    element.classList.remove("show");
    void element.offsetWidth;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 850);
  }

  function renderProducts(filter = "all") {
    if (!productsGrid) return;

    const visibleProducts = PRODUCTS.filter(product => {
      return filter === "all" || product.category === filter;
    });

    productsGrid.innerHTML = visibleProducts.map(product => `
      <article
        class="product-card"
        data-id="${product.id}"
        data-name="${product.name}"
        data-price="${product.price}"
        data-image="${product.image}"
      >
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-body">
          <p class="brand-name">${product.brand}</p>
          <h3>${product.name}</h3>
          <p class="price">${formatCOP(product.price)}</p>
        </div>
        <button class="add-cart-btn" type="button">Agregar al carrito</button>
      </article>
    `).join("");
  }

  function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.textContent = totalItems;
  }

  function updateWhatsappLink() {
    if (!cart.length) {
      cartWhatsapp.href = "https://wa.me/573000000000?text=Hola%20BoxingStore%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos";
      return;
    }

    const lines = cart.map(item => `- ${item.name} x${item.qty} = ${formatCOP(item.price * item.qty)}`);
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const text = `Hola BoxingStore, quiero hacer este pedido:%0A%0A${lines.join("%0A")}%0A%0ATotal: ${encodeURIComponent(formatCOP(total))}`;
    cartWhatsapp.href = `https://wa.me/573000000000?text=${text}`;
  }

  function renderCart() {
    if (!cart.length) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <p>Tu carrito está vacío.</p>
        </div>
      `;
      cartTotal.textContent = formatCOP(0);
      updateCartCount();
      updateWhatsappLink();
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <article class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${formatCOP(item.price)}</p>
          <div class="qty-controls">
            <button class="qty-btn" type="button" data-action="decrease">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" type="button" data-action="increase">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <button class="remove-btn" type="button" data-action="remove">✕</button>
          <strong>${formatCOP(item.price * item.qty)}</strong>
        </div>
      </article>
    `).join("");

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    cartTotal.textContent = formatCOP(total);
    updateCartCount();
    updateWhatsappLink();
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
    showFX("hit");
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    showFX("ko");
  }

  function changeQty(id, action) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    if (action === "increase") item.qty += 1;
    if (action === "decrease") item.qty -= 1;

    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }

    saveCart();
    renderCart();
  }

  function openCartPanel() {
    cartPanel.classList.add("open");
    backdrop.classList.add("show");
    cartPanel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCartPanel() {
    cartPanel.classList.remove("open");
    backdrop.classList.remove("show");
    cartPanel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (filters) {
    filters.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-btn");
      if (!button) return;

      filters.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.filter);
    });
  }

  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-cart-btn");
      if (!btn) return;

      const card = btn.closest(".product-card");
      if (!card) return;

      const product = {
        id: Number(card.dataset.id),
        name: card.dataset.name,
        price: Number(card.dataset.price),
        image: card.dataset.image
      };

      addToCart(product);
      openCartPanel();
    });
  }

  if (cartItems) {
    cartItems.addEventListener("click", (e) => {
      const item = e.target.closest(".cart-item");
      if (!item) return;

      const id = Number(item.dataset.id);
      const action = e.target.dataset.action;

      if (action === "remove") removeFromCart(id);
      if (action === "increase" || action === "decrease") changeQty(id, action);
    });
  }

  if (clearCart) {
    clearCart.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
      showFX("ko");
    });
  }

  if (cartButton) cartButton.addEventListener("click", openCartPanel);
  if (closeCart) closeCart.addEventListener("click", closeCartPanel);
  if (backdrop) backdrop.addEventListener("click", closeCartPanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCartPanel();
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Completa todos los campos.";
        return;
      }

      formStatus.textContent = "Mensaje enviado correctamente.";
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = "";
      }, 3000);
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  renderProducts("all");
  renderCart();
})();