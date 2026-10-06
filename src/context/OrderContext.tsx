import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockOrders';

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingStepIndex: number, deliveredAt?: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'mall_user_orders';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        // Ensure default MALL10245 exists so client demo always works
        const hasDemoOrder = parsed.some(o => o.id === 'MALL10245');
        if (!hasDemoOrder) {
          return [...INITIAL_ORDERS, ...parsed];
        }
        return parsed;
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const createOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingStepIndex: number,
    deliveredAt?: string
  ) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id.toLowerCase() === orderId.toLowerCase()) {
          return {
            ...order,
            status,
            trackingStepIndex,
            deliveredAt: deliveredAt || order.deliveredAt
          };
        }
        return order;
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
