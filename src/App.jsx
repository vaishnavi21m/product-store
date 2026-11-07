import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useNavigationType, useParams, useSearchParams } from 'react-router-dom'
import products from './data/products.json'
import CartProvider from './context/CartProvider'
import useCart from './context/useCart'
import Reveal from './components/Reveal'
import './App.css'
import './motion.css'

const categories = ['Men Fashion', 'Women Fashion', 'Footwear', 'Accessories', 'Bags']
const money = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})
const fallbackImage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#eee8f8"/><path d="M260 205h120l35 140H225z" fill="#d5c8ef"/><circle cx="320" cy="170" r="52" fill="#d5c8ef"/><text x="320" y="405" text-anchor="middle" fill="#65558a" font-family="Arial,sans-serif" font-size="24">Vyntra</text></svg>')}`

function handleImageError(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImage
}

function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 28 28" focusable="false">
          <path d="M5.4 10h17.2l-1.3 12.2H6.7L5.4 10Z" />
          <path d="M9.5 10V7.8a4.5 4.5 0 0 1 9 0V10" />
          <path d="m10.4 13.6 3.6 5.2 3.6-5.2" />
          <path d="M21.3 5.4v3.2m-1.6-1.6h3.2" />
        </svg>
      </span>
      <span className="brand-name">Vyntra</span>
    </>
  )
}

function Header() {
  const { itemCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <div className="announcement-bar" aria-label="Store updates">
        <div className="announcement-track">
          <div className="announcement-group">
            <span>Simple by design ✦</span><span>Made for your wardrobe ✦</span><span>Wear your everyday ✦</span><span>Everyday essentials ✦</span><span>New fits weekly ✦</span>
          </div>
          <div className="announcement-group" aria-hidden="true">
            <span>Simple by design ✦</span><span>Made for your wardrobe ✦</span><span>Wear your everyday ✦</span><span>Everyday essentials ✦</span><span>New fits weekly ✦</span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Vyntra home"><Brand /></Link>
          <div className="header-actions">
            <button
              className="header-icon search-toggle"
              onClick={() => navigate('/#product-search', { replace: location.pathname === '/' })}
              type="button"
              aria-label="Go to product search"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>
            </button>
            <Link className="header-icon cart-link" to="/cart" aria-label={`Cart with ${itemCount} items`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
              <span className="cart-count" key={itemCount}>{itemCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

function ProductCard({ product }) {
  return (
    <article className="home-product-card">
      <Link className="home-product-image" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" onError={handleImageError} />
        <span className="home-category-tag">{product.category}</span>
      </Link>
      <div className="home-product-info">
        <div className="home-product-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
          <span className="home-rating">★ {product.rating}</span>
        </div>
        <p>{product.description}</p>
        <div className="home-product-bottom">
          <strong>{money.format(product.price)}</strong>
          <Link to={`/products/${product.id}`}>View details</Link>
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const [productSearch, setProductSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const searchInputRef = useRef(null)
  const location = useLocation()
  const matchingProducts = products.filter((product) => {
    const query = productSearch.trim().toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(query)
    return matchesSearch && (selectedCategory === 'All' || product.category === selectedCategory)
  })

  useEffect(() => {
    if (location.hash !== '#product-search') return

    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      searchInputRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.hash])

  return (
    <main className="home-page page-width">
      <section className="home-hero" aria-label="New arrivals">
        <div className="hero-art">
          <img
            src="/products/product-09.jpg"
            alt="Model wearing a blue outfit in the city"
            onError={handleImageError}
          />
          <div className="hero-image-note">
            <span>THE EVERYDAY EDIT</span>
            <strong>Good style, made simple.</strong>
          </div>
        </div>
        <div className="hero-copy">
          <span className="eyebrow-pill"><span aria-hidden="true">✦</span> THE NEW SEASON EDIT</span>
          <h1>Style that feels<br />like <span>you.</span></h1>
          <p>Easy-to-wear favorites, thoughtfully picked for wherever the day takes you.</p>
          <Link className="button button-primary" to="/shop">Explore the collection</Link>
        </div>
      </section>

      <section className="home-catalog" aria-labelledby="home-catalog-title">
        <div className="home-catalog-heading">
          <div><p className="eyebrow">Made for your everyday</p><h1 id="home-catalog-title">Trending Products</h1></div>
          <span>{matchingProducts.length} of {products.length} products</span>
        </div>
        <label className="home-product-search">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search products by name</span>
          <input
            id="product-search"
            ref={searchInputRef}
            onChange={(event) => setProductSearch(event.target.value)}
            placeholder="Search by product name..."
            type="search"
            value={productSearch}
          />
          {productSearch && <button onClick={() => setProductSearch('')} type="button" aria-label="Clear product search">×</button>}
        </label>
        <div className="category-strip home-search-categories" aria-label="Filter products by category">
          {['All', ...categories].map((category) => {
            const selected = selectedCategory === category
            return (
              <button
                aria-pressed={selected}
                className={`category-filter${selected ? ' selected' : ''}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            )
          })}
        </div>
        {matchingProducts.length > 0 ? (
          <div className="home-product-grid">
            {matchingProducts.map((product, index) => <Reveal key={product.id} delay={(index % 4) * 70}><ProductCard product={product} /></Reveal>)}
          </div>
        ) : (
          <div className="home-search-empty" role="status">
            <h2>No matching products</h2>
            <p>Try another product name or clear your search.</p>
            <button
              className="button button-outline"
              onClick={() => {
                setProductSearch('')
                setSelectedCategory('All')
              }}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategories = searchParams.getAll('category')
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'featured'

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesSearch = product.name.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })

    if (sort === 'price-low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'rating') return [...filtered].sort((a, b) => b.rating - a.rating)
    return filtered
  }, [search, selectedCategories, sort])

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  function selectCategory(category) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('category')
      if (category !== 'All') next.set('category', category)
      return next
    }, { replace: true })
  }

  return (
    <main className="shop-page page-width">
      <section className="shop-hero">
        <div className="shop-hero-copy"><span className="eyebrow-pill">✦ &nbsp; Shop Smarter</span><h1>Explore Our<br /><span>Latest</span> Collection</h1><p>Premium quality. Unbeatable style.</p><a className="button button-primary" href="#catalog" onClick={(event) => {
          event.preventDefault()
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
        }}>Shop Now</a></div>
        <img src="/products/product-09.jpg" alt="Model wearing a blue outfit in the city" onError={handleImageError} />
        <span className="shop-hero-script" aria-hidden="true">Fashion<br />Your Way</span>
      </section>
      <div className="shop-breadcrumb"><Link to="/">⌂</Link><span>›</span><span>Shop</span></div>
      <div className="shop-heading" id="catalog">
        <div><p className="eyebrow">The Vyntra edit</p><h1>Shop all</h1></div>
        <span>{visibleProducts.length ? `Showing 1-${visibleProducts.length} of ${visibleProducts.length} products` : 'Showing 0 products'}</span>
      </div>
      <div className="shop-layout">
        <section className="shop-results" aria-label="Products">
          <div className="shop-toolbar">
            <label className="shop-search">
              <span className="sr-only">Search products</span>
              <span aria-hidden="true">⌕</span>
              <input
                onChange={(event) => setSearchParams((current) => {
                  const next = new URLSearchParams(current)
                  if (event.target.value) next.set('search', event.target.value)
                  else next.delete('search')
                  return next
                }, { replace: true })}
                placeholder="Search by product name..."
                type="search"
                value={search}
              />
            </label>
            <label className="sort-select">Sort by:
              <select onChange={(event) => {
                setSearchParams((current) => {
                  const next = new URLSearchParams(current)
                  if (event.target.value === 'featured') next.delete('sort')
                  else next.set('sort', event.target.value)
                  return next
                }, { replace: true })
              }} value={sort}>
                <option value="featured">Popularity</option>
                <option value="rating">Top rated</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
          <div className="category-strip shop-category-strip" aria-label="Shop categories">
            {['All', ...categories].map((category) => {
              const isSelected = category === 'All' ? selectedCategories.length === 0 : selectedCategories.includes(category)
              return (
                <button
                  aria-pressed={isSelected}
                  className={`category-filter${isSelected ? ' selected' : ''}`}
                  key={category}
                  onClick={() => selectCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              )
            })}
          </div>
          {visibleProducts.length ? (
            <div className="shop-product-grid">
              {visibleProducts.map((product, index) => <Reveal key={product.id} delay={(index % 4) * 70}><ProductCard product={product} /></Reveal>)}
            </div>
          ) : (
            <div className="empty-results"><h2>No products found</h2><p>Try another search or browse the full collection.</p><button className="button button-primary" onClick={clearFilters} type="button">View all products</button></div>
          )}
        </section>
      </div>
    </main>
  )
}

function ProductPage() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [cartMessage, setCartMessage] = useState('')

  if (!product) {
    return <main className="empty-page page-width"><p className="eyebrow">404 — Not found</p><h1>We couldn't find that product.</h1><Link className="button button-primary" to="/shop">Back to Shop</Link></main>
  }

  function addToCart() {
    for (let index = 0; index < quantity; index += 1) addItem(product)
    setCartMessage(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart`)
  }

  function buyNow() {
    addToCart()
    navigate('/cart')
  }

  return (
    <main className="product-page page-width">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">›</span><Link to="/shop">Shop</Link><span aria-hidden="true">›</span><span aria-current="page">{product.name}</span>
      </nav>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} onError={handleImageError} />
            <span className="product-image-caption">{product.category}</span>
          </div>
        </div>
        <section className="product-detail-info">
          <p className="detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span aria-hidden="true">★★★★★</span><strong>{product.rating}</strong><span>({product.reviews} reviews)</span><span className="stock-status">In Stock</span></div>
          <div className="detail-price-row"><strong>{money.format(product.price)}</strong></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-quantity"><strong>Quantity:</strong><div className="quantity-control"><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} type="button">+</button></div></div>
          <div className="detail-actions"><button className="button button-primary" onClick={addToCart} type="button">Add to Cart</button><button className="button button-outline" onClick={buyNow} type="button">Buy Now</button></div>
          {cartMessage && <p className="cart-feedback" role="status">{cartMessage}. <Link to="/cart">View cart</Link></p>}
          <div className="service-promises"><div><span aria-hidden="true">♧</span><p><strong>Free Delivery</strong><small>On orders above ₹999</small></p></div><div><span aria-hidden="true">↩</span><p><strong>Easy Returns</strong><small>Within 7 days</small></p></div><div><span aria-hidden="true">♢</span><p><strong>Secure Payments</strong><small>100% secure</small></p></div></div>
        </section>
      </div>
    </main>
  )
}

function CartPage() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  const [completedOrder, setCompletedOrder] = useState(null)

  return (
    <main className="cart-page page-width">
      <div className="cart-page-heading"><div><p className="eyebrow">Your selection</p><h1>Your Cart</h1><span className="cart-item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span></div>{items.length > 0 && <button onClick={clearCart} type="button">Clear All</button>}</div>
      {completedOrder ? (
        <div className="order-success">
          <span aria-hidden="true">✓</span>
          <p className="eyebrow">Order placed</p>
          <h2>Thanks for your order!</h2>
          <p className="order-id-line">Order ID: <strong>{completedOrder.id}</strong></p>
          <p>Your order has been recorded for this demo. No payment was taken.</p>
          <div className="order-lines">
            {completedOrder.items.map(({ product, quantity }) => (
              <div className="order-line" key={product.id}>
                <span>{product.name} <small>× {quantity}</small></span>
                <strong>{money.format(product.price * quantity)}</strong>
              </div>
            ))}
            <div className="order-line order-line-total"><strong>Total</strong><strong>{money.format(completedOrder.total)}</strong></div>
          </div>
          <Link className="button button-primary" to="/shop">Continue Shopping</Link>
        </div>
      ) : !items.length ? (
        <div className="empty-cart"><span aria-hidden="true">♡</span><h2>Your cart is waiting for something good.</h2><p>Explore the collection and find your new favorite.</p><Link className="button button-primary" to="/shop">Continue Shopping</Link></div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link className="cart-item-image" to={`/products/${product.id}`}><img src={product.image} alt={product.name} onError={handleImageError} /></Link>
                <div className="cart-item-content">
                  <div className="cart-item-heading"><div><Link to={`/products/${product.id}`}>{product.name}</Link><span>{product.category}</span></div><button onClick={() => removeItem(product.id)} type="button" aria-label={`Remove ${product.name}`}>×</button></div>
                  <div className="cart-item-prices"><strong className="cart-item-price">{money.format(product.price)}</strong></div>
                  <div className="cart-item-bottom"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, quantity - 1)} type="button">−</button><span>{quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, quantity + 1)} type="button">+</button></div><button className="remove-item-link" onClick={() => removeItem(product.id)} type="button">Remove</button><span className="item-total">{money.format(product.price * quantity)}</span></div>
                </div>
              </article>
            ))}
            <Link className="continue-shopping" to="/shop">Continue Shopping</Link>
          </section>
          <aside className="order-summary">
            <div className="summary-title"><h2>Order summary</h2></div>
            <div className="summary-row"><span>Total items</span><strong>{itemCount}</strong></div>
            <div className="summary-row"><span>Subtotal</span><strong>{money.format(totalPrice)}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>Calculated later</strong></div>
            <div className="summary-total"><strong>Total</strong><strong>{money.format(totalPrice)}</strong></div>
            <p className="checkout-note">Shipping charges, if applicable, are not included.</p>
            <button className="checkout-button" onClick={() => {
              const reference = `VN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
              setCompletedOrder({ id: reference, items: [...items], total: totalPrice })
              clearCart()
            }} type="button">Proceed to Checkout</button>
            <p className="payment-note">Demo checkout · no payment taken</p>
            <Link className="continue-button" to="/shop">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand" to="/" aria-label="Vyntra home"><Brand /></Link>
        <p>Wear what feels like you.</p>
        <span>© 2026 VYNTRA · Your style, your story.</span>
      </div>
    </footer>
  )
}

function BrowserBackBehavior() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = useRef(location.pathname)

  useEffect(() => {
    currentPath.current = location.pathname
  }, [location.pathname])

  useEffect(() => {
    function handlePopState() {
      const previousPath = currentPath.current
      const destinationPath = window.location.pathname
      if ((previousPath === '/shop' || previousPath === '/') && destinationPath !== '/') {
        navigate('/', { replace: true })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navigate])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (!hash && navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, navigationType])

  return null
}

function Storefront() {
  const location = useLocation()

  return (
    <CartProvider>
      <BrowserBackBehavior />
      <ScrollToTop />
      <Header />
      <div className="page-fade" key={location.pathname}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<main className="empty-page page-width"><h1>Page not found</h1><Link className="button button-primary" to="/">Back Home</Link></main>} />
      </Routes>
      </div>
      <Footer />
    </CartProvider>
  )
}

export default Storefront
