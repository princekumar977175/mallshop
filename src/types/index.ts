export type CategorySlug = 'men' | 'women' | 'kids' | 'beauty' | 'footwear' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  subcategory: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  description: string;
  material: string;
  specifications: Record<string, string>;
  careInstructions: string[];
  inStock: boolean;
  fastDelivery: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isOffer?: boolean;
}

export interface CartItem {
  id: string; // unique item id: productId-size-color
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Address {
  id?: string;
  name: string;
  mobile: string;
  houseFlat: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  addressType: 'Home' | 'Office';
  isDefault?: boolean;
}

export type OrderStatus = 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  image: string;
  size: string;
  colorName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // e.g. MALL10245
  createdAt: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  status: OrderStatus;
  expectedDeliveryDate: string;
  deliveredAt?: string;
  trackingStepIndex: number; // 0 to 4 (Confirmed, Packed, Shipped, Out for Delivery, Delivered)
}

export type TrackingStage = 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface DeliveryPartner {
  name: string;
  phone: string;
  rating: number;
  totalDeliveries: number;
  photoUrl: string;
  vehicleType: string;
  vehicleNumber: string;
}

export interface FilterState {
  category?: CategorySlug | 'all';
  subcategories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  minRating: number;
  sizes: string[];
  colors: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
