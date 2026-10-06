import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MALL10245',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    items: [
      {
        productId: 'mall-m-01',
        productName: 'Relaxed Fit French Linen Shirt',
        brand: 'URBAN FORM',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
        size: 'L',
        colorName: 'Oatmeal Beige',
        quantity: 1,
        price: 1899
      },
      {
        productId: 'mall-f-02',
        productName: 'Minimalist Monochromatic Leather Low Sneakers',
        brand: 'URBAN FORM',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
        size: '9',
        colorName: 'Triple White',
        quantity: 1,
        price: 2999
      }
    ],
    totalAmount: 4898,
    discountAmount: 489,
    couponCode: 'MALL10',
    shippingAddress: {
      name: 'Aditya Sharma',
      mobile: '+91 98450 12345',
      houseFlat: 'Flat 402, Tower B',
      street: 'Prestige Elmwood, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      addressType: 'Home',
      isDefault: true
    },
    paymentMethod: 'UPI',
    status: 'Out for Delivery',
    expectedDeliveryDate: 'Today, by 10:15 PM',
    trackingStepIndex: 3
  },
  {
    id: 'MALL10189',
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    items: [
      {
        productId: 'mall-w-01',
        productName: 'Tiered Pleated Floral Silk-Blend Midi Dress',
        brand: 'MAISON DE LUXE',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
        size: 'M',
        colorName: 'Blush Rose Print',
        quantity: 1,
        price: 3899
      }
    ],
    totalAmount: 3899,
    discountAmount: 390,
    couponCode: 'MALL10',
    shippingAddress: {
      name: 'Aditya Sharma',
      mobile: '+91 98450 12345',
      houseFlat: 'Flat 402, Tower B',
      street: 'Prestige Elmwood, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      addressType: 'Home',
      isDefault: true
    },
    paymentMethod: 'Card',
    status: 'Delivered',
    expectedDeliveryDate: 'Oct 03, 2026',
    deliveredAt: 'Oct 03, 2026, 4:15 PM',
    trackingStepIndex: 4
  }
];

export const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Aditya Sharma',
    mobile: '+91 98450 12345',
    houseFlat: 'Flat 402, Tower B',
    street: 'Prestige Elmwood, 12th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    addressType: 'Home' as const,
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Aditya Sharma',
    mobile: '+91 98450 12345',
    houseFlat: 'Floor 6, Tech Park Building 4',
    street: 'Outer Ring Road, Kadubeesanahalli',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560103',
    addressType: 'Office' as const,
    isDefault: false
  }
];
