export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  images: string[];
  stock: number;
  categoryId: string;
  category: CategoryType;
  featured: boolean;
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

export interface CartItemType {
  id: string;
  product: ProductType;
  quantity: number;
}

export interface OrderType {
  id: string;
  total: number;
  status: string;
  items: OrderItemType[];
  payment: PaymentType | null;
  createdAt: string;
}

export interface OrderItemType {
  id: string;
  product: ProductType;
  quantity: number;
  price: number;
}

export interface PaymentType {
  id: string;
  qpayInvoiceId: string | null;
  qpayQrText: string | null;
  amount: number;
  status: string;
}
