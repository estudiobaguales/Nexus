"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product, ProductVariant, ShopifyCart, ShopifyCartLine } from "@/lib/shopify/types"
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from "@/lib/shopify"

type CartContextType = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variant: ProductVariant, product: Product) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalQuantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const ensureCart = useCallback(async () => {
    if (cart) return cart
    const newCart = await createCart()
    setCart(newCart)
    return newCart
  }, [cart])

  const addItem = useCallback(
    async (variant: ProductVariant, _product: Product) => {
      setIsLoading(true)
      try {
        const currentCart = await ensureCart()
        const updatedCart = await addCartLines(currentCart.id, [
          { merchandiseId: variant.id, quantity: 1 },
        ])
        setCart(updatedCart)
        setIsOpen(true)
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [ensureCart]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updatedCart = await updateCartLines(cart.id, [{ id: lineId, quantity }])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error updating cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updatedCart = await removeCartLines(cart.id, [lineId])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error removing from cart:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  const totalQuantity = cart?.lines.edges.reduce(
    (total: number, edge: { node: ShopifyCartLine }) => total + edge.node.quantity,
    0
  ) ?? 0

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
