// Authentication JavaScript for Blush & Bloom
// Uses localStorage for demo authentication (NOT production-level secure)

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
});

function initAuth() {
    updateAuthUI();
    checkAuthState();
}

// Check if user is logged in
function isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user !== null;
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Register new user
function registerUser(name, email, phone, password) {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
}

// Login user
function loginUser(email, password, rememberMe = false) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return { success: false, message: 'User not found' };
    }
    
    // Check password
    if (user.password !== password) {
        return { success: false, message: 'Incorrect password' };
    }
    
    // Login successful
    const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    return { success: true, message: 'Login successful' };
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    updateAuthUI();
    showNotification('Logged out successfully');
    
    // Redirect to home after logout
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update auth UI based on login state
function updateAuthUI() {
    const user = getCurrentUser();
    const loginLink = document.querySelector('.login-link');
    const accountLink = document.querySelector('.account-link');
    const personIcon = document.querySelector('.person-icon');
    
    if (user) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (accountLink) {
            accountLink.style.display = 'block';
            accountLink.textContent = user.name.split(' ')[0]; // Show first name
        }
        if (personIcon) {
            personIcon.href = '#';
            personIcon.onclick = function(e) {
                e.preventDefault();
                showUserMenu();
            };
        }
    } else {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'block';
        if (accountLink) accountLink.style.display = 'none';
        if (personIcon) {
            personIcon.href = 'login.html';
            personIcon.onclick = null;
        }
    }
}

// Check auth state on page load
function checkAuthState() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (!rememberMe) {
        // If not "remember me", clear current user on page load
        localStorage.removeItem('currentUser');
    }
}

// Show user dropdown menu
function showUserMenu() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Create dropdown menu if it doesn't exist
    let menu = document.getElementById('user-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'user-menu';
        menu.className = 'dropdown-menu position-absolute end-0 mt-2 show';
        menu.style.zIndex = '1050';
        menu.innerHTML = `
            <div class="dropdown-header">
                <strong>${user.name}</strong><br>
                <small class="text-muted">${user.email}</small>
            </div>
            <hr>
            <a class="dropdown-item" href="#" onclick="logoutUser(); return false;">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
            </a>
        `;
        document.body.appendChild(menu);
        
        // Position menu near person icon
        const personIcon = document.querySelector('.person-icon');
        if (personIcon) {
            const rect = personIcon.getBoundingClientRect();
            menu.style.top = (rect.bottom + 5) + 'px';
            menu.style.right = (window.innerWidth - rect.right) + 'px';
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.closest('.person-icon')) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification position-fixed top-0 end-0 m-3 p-3 bg-${type} text-white rounded shadow`;
    notification.style.zIndex = '9999';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
