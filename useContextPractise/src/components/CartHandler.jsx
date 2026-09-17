import { useContext, createContext, useState } from "react"

const TICKET_PRICE = 9999;

const CartContext = createContext()

export function CartHandler({ children }) {

    const [quantity, setQuantity] = useState(1)
    const clearCart = () => setQuantity(0)

    const value = {
        quantity,
        setQuantity,
        total: quantity * TICKET_PRICE,
        clearCart,
    }
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
