import { useContext } from 'react'
import CartState from './CartState'

export default function useCart() {
  const context = useContext(CartState)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
