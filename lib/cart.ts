export interface CartItem {
  productId: string
  productName: string
  price: number
  quantity: number
  image: string
  customization?: {
    colour: string
    print: string
    size: string
    name: string
  }
  appPlan?: boolean
}

const STORAGE_KEY = "hwa_cart"

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function addToCart(
  cart: CartItem[],
  item: Omit<CartItem, "quantity"> & { quantity?: number }
): CartItem[] {
  const existing = cart.find((i) => i.productId === item.productId)
  if (existing) {
    return cart.map((i) =>
      i.productId === item.productId
        ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
        : i
    )
  }
  return [...cart, { ...item, quantity: item.quantity ?? 1 }]
}

export function updateCartQuantity(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return cart.filter((i) => i.productId !== productId)
  }
  return cart.map((i) => (i.productId === productId ? { ...i, quantity } : i))
}

export function removeCartItem(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter((i) => i.productId !== productId)
}
