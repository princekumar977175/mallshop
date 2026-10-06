import { DeliveryPartner } from '../types';

export interface RouteCheckpoint {
  lat: number;
  lng: number;
  etaMinutes: number;
  etaLabel: string;
  distanceKm: number;
  distanceLabel: string;
  stageName: 'Out for Delivery' | 'Arriving' | 'Delivered';
  timelineIndex: number; // 3 for Out for Delivery, 4 for Delivered
  message: string;
  heading: number; // rotation in degrees
}

export const DELIVERY_PARTNER: DeliveryPartner = {
  name: 'Rahul Kumar',
  phone: '+91 98765 43210',
  rating: 4.85,
  totalDeliveries: 1842,
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  vehicleType: 'TVS Apache RTR 160 (Motorcycle)',
  vehicleNumber: 'BR-01-AX-1234'
};

// Customer delivery location: Indiranagar 12th Main Road, Bangalore
export const CUSTOMER_LOCATION = {
  lat: 12.9723,
  lng: 77.6455,
  address: 'Apartment 402, Prestige Elmwood, 12th Main Road, Indiranagar, Bengaluru, 560038',
  landmark: 'Near Starbucks Coffee, Opposite Defence Colony Park'
};

// Realistic delivery route points starting from the fulfillment center 2.4 km away to the customer location
export const ROUTE_CHECKPOINTS: RouteCheckpoint[] = [
  {
    lat: 12.9865,
    lng: 77.6320,
    etaMinutes: 18,
    etaLabel: '18 MIN',
    distanceKm: 2.4,
    distanceLabel: '2.4 km away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your order is on the way. Rahul Kumar has picked up your package.',
    heading: 140
  },
  {
    lat: 12.9838,
    lng: 77.6345,
    etaMinutes: 15,
    etaLabel: '15 MIN',
    distanceKm: 2.0,
    distanceLabel: '2.0 km away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your delivery partner is navigating through 100 Feet Road.',
    heading: 135
  },
  {
    lat: 12.9810,
    lng: 77.6372,
    etaMinutes: 12,
    etaLabel: '12 MIN',
    distanceKm: 1.6,
    distanceLabel: '1.6 km away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your delivery partner is moving swiftly towards your neighbourhood.',
    heading: 145
  },
  {
    lat: 12.9782,
    lng: 77.6401,
    etaMinutes: 9,
    etaLabel: '9 MIN',
    distanceKm: 1.2,
    distanceLabel: '1.2 km away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your delivery partner is 1.2 km away near 12th Main junction.',
    heading: 130
  },
  {
    lat: 12.9755,
    lng: 77.6428,
    etaMinutes: 6,
    etaLabel: '6 MIN',
    distanceKm: 0.8,
    distanceLabel: '800 m away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your delivery partner is nearby in your locality.',
    heading: 125
  },
  {
    lat: 12.9738,
    lng: 77.6443,
    etaMinutes: 3,
    etaLabel: '3 MIN',
    distanceKm: 0.45,
    distanceLabel: '450 m away',
    stageName: 'Out for Delivery',
    timelineIndex: 3,
    message: 'Your order will arrive shortly. Please keep phone handy.',
    heading: 110
  },
  {
    lat: 12.9729,
    lng: 77.6450,
    etaMinutes: 1,
    etaLabel: '1 MIN',
    distanceKm: 0.2,
    distanceLabel: '200 m away',
    stageName: 'Arriving',
    timelineIndex: 3,
    message: 'Your delivery partner has entered your street and is arriving!',
    heading: 105
  },
  {
    lat: 12.9724,
    lng: 77.6454,
    etaMinutes: 0.5,
    etaLabel: 'ARRIVING',
    distanceKm: 0.05,
    distanceLabel: '50 m away',
    stageName: 'Arriving',
    timelineIndex: 3,
    message: 'Rahul Kumar is at your apartment building entrance.',
    heading: 95
  },
  {
    lat: 12.9723,
    lng: 77.6455,
    etaMinutes: 0,
    etaLabel: 'DELIVERED',
    distanceKm: 0,
    distanceLabel: 'Delivered',
    stageName: 'Delivered',
    timelineIndex: 4,
    message: 'Your order has been delivered successfully. Thank you for shopping with MALL.',
    heading: 90
  }
];

// High-resolution polyline route coordinates
export const ROUTE_PATH_COORDINATES: [number, number][] = ROUTE_CHECKPOINTS.map(c => [c.lat, c.lng]);
