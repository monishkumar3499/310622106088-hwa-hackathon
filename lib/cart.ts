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
