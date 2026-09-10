# Blush & Bloom - Premium Beauty E-commerce Website

A modern, premium, fully responsive makeup and skincare e-commerce website with an attractive feminine UI.

## Features

### 🎨 Design
- **Feminine Color Palette**: Blush pink, dusty rose, soft lavender, cream/off-white, white, and dark charcoal
- **Premium UI**: Elegant typography, rounded cards, smooth hover animations, subtle transitions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Custom Styling**: Heavily customized Bootstrap with a unique, non-template look

### 🛍️ E-commerce Features
- **Product Catalog**: 16+ sample products across makeup and skincare categories
- **Product Filtering**: Filter by category, price range, and rating
- **Product Sorting**: Sort by popularity, price (low/high), and newest
- **Search Functionality**: Real-time product search
- **Product Details**: Detailed product pages with images, descriptions, reviews, and ingredients
- **Shopping Cart**: Full cart functionality with quantity updates and removal
- **Wishlist**: Save favorite products and move them to cart
- **Beauty Quiz**: Interactive quiz for personalized product recommendations

### 📱 Pages
1. **Home Page**: Hero section, categories, best sellers, skincare banner, makeup collection, offers, beauty quiz, about, newsletter
2. **Products Page**: Product listing with filters and sorting
3. **Product Details Page**: Comprehensive product information
4. **Cart Page**: Shopping cart with order summary
5. **Wishlist Page**: Saved products management

### ⚡ Functionality
- Add to cart with quantity selection
- Remove from cart
- Cart persistence using localStorage
- Wishlist management
- Product filtering and sorting
- Search functionality
- Newsletter subscription with validation
- Responsive mobile menu
- Smooth scroll navigation
- Notification system

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables
- **Bootstrap 5.3.8**: Responsive framework
- **Bootstrap Icons**: Icon library
- **JavaScript (Vanilla)**: All interactions and functionality
- **LocalStorage**: Cart and wishlist persistence

## Project Structure

```
Blush and Bloom/
├── index.html          # Home page
├── products.html       # Product listing page
├── product-details.html # Product details page
├── cart.html          # Shopping cart page
├── wishlist.html      # Wishlist page
├── css/
│   └── style.css      # Custom styles
├── js/
│   ├── main.js        # Main JavaScript functionality
│   └── products.js    # Mock product data
├── images/            # (Add your product images here)
└── server.js          # Simple HTTP server for local development
```

## Getting Started

### Option 1: Using Node.js Server (Recommended)

1. Make sure you have Node.js installed
2. Navigate to the project directory
3. Run the server:
   ```bash
   node server.js
   ```
4. Open your browser and visit: `http://localhost:8000`

### Option 2: Direct File Opening

Simply open `index.html` in your web browser. However, some features may not work properly due to browser security restrictions.

## Customization

### Adding Products

Edit `js/products.js` to add or modify products. Each product should have:

```javascript
{
    id: 1,
    name: "Product Name",
    category: "Makeup",
    subcategory: "Lipsticks",
    price: 899,
    discountPrice: 719, // Optional
    rating: 4.8,
    reviews: 234,
    image: "path/to/image.jpg",
    description: "Product description",
    shades: ["Shade 1", "Shade 2"], // Optional
    ingredients: "Ingredients list",
    howToUse: "Usage instructions"
}
```

### Changing Colors

Modify CSS variables in `css/style.css`:

```css
:root {
    --blush-pink: #E8B4B8;
    --dusty-rose: #C9A9A6;
    --soft-lavender: #E6E6FA;
    /* ... more variables */
}
```

### Adding Images

1. Place your product images in the `images/` directory
2. Update the `image` paths in `js/products.js`
3. Or use external URLs (currently using Unsplash for demo)

## Features Breakdown

### Navbar
- Sticky header with scroll effect
- Responsive hamburger menu for mobile
- Search, user, wishlist, and cart icons
- Live cart and wishlist counts

### Hero Section
- Full-width hero with gradient background
- Animated text and buttons
- Call-to-action buttons for makeup and skincare

### Category Section
- 6 category cards with hover effects
- Beautiful imagery with overlay text
- Click-to-navigate functionality

### Best Sellers
- 8 featured products in responsive grid
- Product cards with images, ratings, prices
- Wishlist and quick view functionality
- Add to cart buttons

### Skincare Banner
- Dedicated promotional section
- Gradient background with subtle pattern
- Call-to-action button

### Makeup Collection
- Tabbed navigation for subcategories
- Dynamic product loading
- Interactive category switching

### Beauty Quiz
- 5-question interactive quiz
- Personalized product recommendations
- Form validation

### Offers Section
- 4 promotional cards
- Discount badges and offers
- Call-to-action buttons

### Newsletter
- Email subscription form
- Validation and success notification

### Footer
- Multi-column layout
- Shop, Help, Company sections
- Social media icons
- Contact information

## Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Backend integration for real product data
- User authentication system
- Payment gateway integration
- Order tracking system
- Product reviews and ratings
- Advanced search with filters
- Multi-language support
- Currency conversion

## License

This project is for educational and demonstration purposes.

## Credits

- Design concept inspired by premium beauty brands
- Images from Unsplash (for demo purposes)
- Icons from Bootstrap Icons
- Framework: Bootstrap 5.3.8

---

**Note**: This is a frontend-only demonstration. To make it a fully functional e-commerce site, you'll need to integrate with a backend system, payment gateway, and database.
