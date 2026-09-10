// Main JavaScript file for Blush & Bloom website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initCart();
    initWishlist();
    initProductFilters();
    initBeautyQuiz();
    initNewsletter();
    initAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add shadow on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
}

// Shopping Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    updateCartCount();
    renderCart();
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="bi bi-bag-heart display-1 text-muted"></i>
                <h4 class="mt-3">Your cart is empty</h4>
                <p class="text-muted">Add some beautiful products to get started!</p>
                <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        updateCartTotals();
        return;
    }

    let cartHTML = '';
    cart.forEach(item => {
        const price = item.discountPrice || item.price;
        cartHTML += `
            <div class="cart-item d-flex align-items-center py-3 border-bottom">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details flex-grow-1 px-3">
                    <h6 class="mb-1">${item.name}</h6>
                    <p class="mb-1 text-primary">₹${price.toLocaleString()}</p>
                    <div class="quantity-controls d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => {
        const price = item.discountPrice || item.price;
        return sum + (price * item.quantity);
    }, 0);

    const discount = cart.reduce((sum, item) => {
        if (item.discountPrice) {
            return sum + ((item.price - item.discountPrice) * item.quantity);
        }
        return sum;
    }, 0);

    const deliveryCharge = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + deliveryCharge;

    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const deliveryEl = document.getElementById('cart-delivery');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
    if (discountEl) discountEl.textContent = `-₹${discount.toLocaleString()}`;
    if (deliveryEl) deliveryEl.textContent = deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function initWishlist() {
    updateWishlistCount();
    renderWishlist();
}

function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist();
        updateWishlistCount();
        showNotification('Product added to wishlist!');
    } else {
        showNotification('Product already in wishlist!');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist();
    updateWishlistCount();
    renderWishlist();
}

function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'block' : 'none';
    }
}

function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-items');
    if (!wishlistContainer) return;

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist text-center py-5">
                <i class="bi bi-heart display-1 text-muted"></i>
                <h4 class="mt-3">Your wishlist is empty</h4>
                <p class="text-muted">Save products you love!</p>
                <a href="index.html" class="btn btn-primary">Explore Products</a>
            </div>
        `;
        return;
    }

    let wishlistHTML = '';
    wishlist.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
            wishlistHTML += `
                <div class="wishlist-item">
                    <div class="card h-100 border-0 shadow-sm">
                        <img src="${product.image}" alt="${product.name}" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${product.name}</h6>
                            <p class="card-text text-primary">₹${(product.discountPrice || product.price).toLocaleString()}</p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary btn-sm flex-grow-1" onclick="addToCart(${product.id})">
                                    Add to Cart
                                </button>
                                <button class="btn btn-outline-danger btn-sm" onclick="removeFromWishlist(${product.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    wishlistContainer.innerHTML = wishlistHTML;
}

// Product filtering and sorting
function initProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    if (ratingFilter) {
        ratingFilter.addEventListener('change', applyFilters);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const category = document.getElementById('category-filter')?.value || 'all';
    const maxPrice = parseInt(document.getElementById('price-filter')?.value) || 10000;
    const minRating = parseInt(document.getElementById('rating-filter')?.value) || 0;
    const sortBy = document.getElementById('sort-select')?.value || 'popularity';
    const searchTerm = document.getElementById('search-input')?.value?.toLowerCase() || '';

    let filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = (product.discountPrice || product.price) <= maxPrice;
        const matchesRating = product.rating >= minRating;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popularity':
        default:
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search display-1 text-muted"></i>
                <h4 class="mt-3">No products found</h4>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    let productsHTML = '';
    productsToRender.forEach(product => {
        const isInWishlist = wishlist.includes(product.id);
        const priceHTML = product.discountPrice 
            ? `<span class="text-decoration-line-through text-muted">₹${product.price.toLocaleString()}</span>
               <span class="ms-2 text-primary">₹${product.discountPrice.toLocaleString()}</span>`
            : `<span class="text-primary">₹${product.price.toLocaleString()}</span>`;

        productsHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="product-card card h-100 border-0 shadow-sm">
                    <div class="product-image-container position-relative">
                        <img src="${product.image}" alt="${product.name}" class="card-img-top product-image">
                        <button class="wishlist-btn position-absolute top-0 end-0 m-2 btn btn-light rounded-circle" 
                                onclick="toggleWishlist(${product.id})">
                            <i class="bi bi-heart${isInWishlist ? '-fill text-danger' : ''}"></i>
                        </button>
                        <div class="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0">
                            <button class="btn btn-primary me-2" onclick="viewProduct(${product.id})">Quick View</button>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="text-muted small mb-1">${product.category}</p>
                        <h6 class="card-title mb-2">${product.name}</h6>
                        <div class="mb-2">
                            ${renderStars(product.rating)}
                            <span class="text-muted small">(${product.reviews})</span>
                        </div>
                        <div class="mb-3">${priceHTML}</div>
                        <button class="btn btn-outline-primary w-100 btn-sm" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    productGrid.innerHTML = productsHTML;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="bi bi-star-half text-warning"></i>';
        } else {
            stars += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return stars;
}

// Product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    localStorage.setItem('viewingProduct', JSON.stringify(product));
    window.location.href = 'product-details.html';
}

// Beauty Quiz
function initBeautyQuiz() {
    const quizForm = document.getElementById('beauty-quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showQuizResults();
        });
    }
}

function showQuizResults() {
    const skinType = document.getElementById('skin-type')?.value;
    const skinConcern = document.getElementById('skin-concern')?.value;
    const makeupStyle = document.getElementById('makeup-style')?.value;
    const finish = document.getElementById('finish')?.value;
    const priceRange = document.getElementById('price-range')?.value;

    // Simple recommendation logic
    let recommendedProducts = products.filter(product => {
        let matches = true;
        
        if (skinType === 'oily' && product.category === 'Skincare') {
            matches = matches && product.description.toLowerCase().includes('matte') || 
                     product.description.toLowerCase().includes('oil control');
        }
        
        if (skinConcern === 'acne' && product.category === 'Skincare') {
            matches = matches && product.description.toLowerCase().includes('acne') || 
                     product.description.toLowerCase().includes('blemish');
        }
        
        if (priceRange === 'budget') {
            matches = matches && (product.discountPrice || product.price) < 500;
        } else if (priceRange === 'premium') {
            matches = matches && (product.discountPrice || product.price) > 1000;
        }
        
        return matches;
    });

    // If no specific matches, show random products from relevant categories
    if (recommendedProducts.length < 3) {
        recommendedProducts = products.filter(p => 
            p.category === 'Skincare' || p.category === 'Makeup'
        ).slice(0, 4);
    }

    const resultsContainer = document.getElementById('quiz-results');
    if (resultsContainer) {
        let resultsHTML = '<h5 class="mb-4">Your Personalized Recommendations</h5>';
        resultsHTML += '<div class="row">';
        
        recommendedProducts.slice(0, 4).forEach(product => {
            resultsHTML += `
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <img src="${product.image}" alt="${product.name}" class="card-img-top">
                        <div class="card-body">
                            <h6 class="card-title">${product.name}</h6>
                            <p class="card-text text-primary">₹${(product.discountPrice || product.price).toLocaleString()}</p>
                            <button class="btn btn-primary btn-sm w-100" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        resultsHTML += '</div>';
        resultsContainer.innerHTML = resultsHTML;
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Newsletter subscription
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                showNotification('Please enter a valid email address');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Animations
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification position-fixed top-0 end-0 m-3 p-3 bg-success text-white rounded shadow';
    notification.style.zIndex = '9999';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
