"use client"

import { motion, AnimatePresence } from "motion/react"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"
import Image from "next/image"

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart()

  const lines = cart?.lines.edges.map((edge) => edge.node) ?? []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-foreground/15 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[400px] bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-[15px] font-semibold text-foreground">Carrito</h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="text-[13px] text-muted-foreground">Tu carrito esta vacio</p>
                  <button
                    onClick={closeCart}
                    className="h-9 px-5 rounded-full border border-border text-[12px] font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {lines.map((line) => {
                    const image = line.merchandise.product?.images?.edges?.[0]?.node
                    return (
                      <motion.div
                        key={line.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex gap-4"
                      >
                        {image && (
                          <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                            <Image
                              src={image.url}
                              alt={image.altText || line.merchandise.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">
                            {line.merchandise.product.title}
                          </p>
                          {line.merchandise.title !== "Default Title" && (
                            <p className="text-[11px] text-muted-foreground">{line.merchandise.title}</p>
                          )}
                          <p className="text-[13px] font-medium text-foreground mt-1">
                            ${parseFloat(line.merchandise.price.amount).toLocaleString("es-CL")}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                line.quantity === 1
                                  ? removeItem(line.id)
                                  : updateItem(line.id, line.quantity - 1)
                              }
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="w-3 h-3" strokeWidth={1.5} />
                            </button>
                            <span className="text-[12px] font-medium w-5 text-center tabular-nums">{line.quantity}</span>
                            <button
                              onClick={() => updateItem(line.id, line.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && cart && (
              <div className="border-t border-border px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] text-muted-foreground">Subtotal</span>
                  <span className="text-[15px] font-semibold text-foreground tabular-nums">
                    ${parseFloat(cart.cost.totalAmount.amount).toLocaleString("es-CL")} {cart.cost.totalAmount.currencyCode}
                  </span>
                </div>
                <a
                  href={cart.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-11 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-80 transition-opacity"
                >
                  {isLoading ? "Procesando..." : "Ir al Checkout"}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
