
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    orderDate: string;
  }