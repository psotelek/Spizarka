export interface Category {
    id: number
    name: string
    amount: number
    measure: string
    expiry_date: string
    category: string
    products: Array<Product>
}

export interface Product {
    id: number
    name: string
    amount: number
    expiry_date: string
    note: string
  }