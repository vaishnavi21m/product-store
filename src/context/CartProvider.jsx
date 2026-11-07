import { useEffect, useMemo, useState } from 'react'
import products from '../data/products.json'
import CartState from './CartState'

const storageKey = 'vyntra-cart'
const legacyStorageKey = 'vyntra-cart'

function readSavedItems() {
  try {
    const savedItems = localStorage.getItem(storageKey)
      ?? localStorage.getItem(legacyStorageKey)
    if (!savedItems) return []

    const parsedItems = JSON.parse(savedItems)
    if (!Array.isArray(parsedItems)) throw new Error('Saved cart must be an array')

    return parsedItems.filter((item) => {
      return products.some((product) => product.id === item.productId)
        && Number.isInteger(item.quantity)
        && item.quantity > 0
    })
  } catch (error) {
    console.error('Unable to read the saved cart from localStorage.', error)
    return []
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(readSavedItems)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart))
    } catch (error) {
      console.error('Unable to save the cart to localStorage.', error)
    }
  }, [cart])

  const addItem = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.productId === product.id)
      if (existing) {
        return currentCart.map((item) => item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      }
      return [...currentCart, { productId: product.id, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCart((currentCart) => {
      if (quantity < 1) return currentCart.filter((item) => item.productId !== productId)
      return currentCart.map((item) => item.productId === productId ? { ...item, quantity } : item)
    })
  }

  const removeItem = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const value = useMemo(() => {
    const items = cart.flatMap((item) => {
      const product = products.find((candidate) => candidate.id === item.productId)
      return product ? [{ product, quantity: item.quantity }] : []
    })

    return {
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      totalPrice: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }
  }, [cart])

  return <CartState.Provider value={value}>{children}</CartState.Provider>
}
