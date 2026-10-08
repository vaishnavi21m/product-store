# Mini E-Commerce Application

A simple and responsive Mini E-Commerce web application built with React and React Router for the React Developer Intern take-home assessment.

## Overview
This application allows users to browse products, search by name, filter by category, view individual product details, and manage items in a shopping cart.

### Implemented Features
- **Local Dummy Data**: Products are stored locally in `src/data/products.json` containing id, name, price, category, rating, image, and description.
- **Product Listing & Filtering**: Responsive product grid with real-time text search and category dropdown filtering. Includes loading and empty states.
- **Product Details Page**: Routing to `/product/:id` showing complete product information, back navigation, and an Add to Cart button.
- **Shopping Cart**:
  - Add items to the cart
  - View total item count in navigation badge and on the cart page
  - Calculate total cart price
  - Remove items from cart
- **Responsive Layout**: Clean and basic CSS layout that works on desktop, tablet, and mobile.

### Missing / Omitted Features
- **Cart Quantity Adjustment**: Inside the cart page, quantity increment/decrement (+ / -) controls are not implemented (items are added as single units and removed directly).
- **LocalStorage Persistence**: Cart state is stored in memory using React state (`useState`) and resets upon browser reload.

---

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm

### Installation & Run Instructions

1. **Clone the repository or navigate to the project directory**:
   ```bash
   cd task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to the local URL displayed in the terminal (usually `http://localhost:5173`).

---

## Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx          # Header navigation bar with cart counter
│   └── ProductCard.jsx     # Reusable card component for product grid
├── data/
│   └── products.json       # Local dummy product catalog
├── pages/
│   ├── Cart.jsx            # Cart items table, totals, and remove button
│   ├── ProductDetail.jsx   # Detailed product view page
│   └── ProductList.jsx     # Main catalog with search & category filters
├── App.jsx                 # App routing and global cart state
├── index.css               # Core CSS styling
└── main.jsx                # Application root
```
