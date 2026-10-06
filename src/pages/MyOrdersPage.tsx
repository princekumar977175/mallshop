import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, ChevronRight, ShoppingBag, Clock, CheckCircle } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export const MyOrdersPage: React.FC = () => {
  const { orders } = useOrders();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Out for Delivery</span>
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-semibold">
            <span>Shipped</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded text-xs font-semibold">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / Page Title */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center space-x-1 text-xs text-neutral-500 mb-1">
              <Link to="/" className="hover:text-neutral-900">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">My Account</span>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">Orders</span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
              My Orders ({orders.length})
            </h1>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center">
            <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800 uppercase">No orders placed yet</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              Browse our curated fashion collections and enjoy real-time live map tracking.
            </p>
            <Link
              to="/"
              className="mt-5 inline-block px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white border border-neutral-200 rounded-sm shadow-subtle overflow-hidden transition-all hover:border-neutral-300"
              >
                {/* Order Card Header */}
                <div className="p-4 sm:p-5 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">
                        Order ID
                      </span>
                      <span className="font-mono font-bold text-neutral-900 text-sm">
                        #{order.id}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">
                        Order Placed
                      </span>
                      <span className="text-neutral-800 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">
                        Total Amount
                      </span>
                      <span className="font-bold text-neutral-900 font-mono">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getStatusBadge(order.status)}

                    <Link
                      to={`/track-order/${order.id}`}
                      className="px-4 py-2 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors shadow-sm flex items-center space-x-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Track Order</span>
                    </Link>
                  </div>
                </div>

                {/* Order Items List */}
                <div className="p-4 sm:p-5 divide-y divide-neutral-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-top rounded-sm border border-neutral-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          {item.brand}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1">
                          {item.productName}
                        </h4>
                        <div className="flex items-center space-x-3 text-xs text-neutral-600 mt-1">
                          <span>Size: <strong>{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong>{item.colorName}</strong></span>
                          <span>•</span>
                          <span>Qty: <strong>{item.quantity}</strong></span>
                        </div>
                        <p className="text-xs font-bold text-neutral-900 font-mono mt-1">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="text-right hidden sm:block">
                        <span className="text-xs text-neutral-500 block">
                          {order.status === 'Delivered' ? 'Delivered' : 'Expected by'}
                        </span>
                        <span className="text-xs font-bold text-neutral-900">
                          {order.deliveredAt || order.expectedDeliveryDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer Info */}
                <div className="px-4 sm:px-5 py-3 bg-neutral-50 border-t border-neutral-100 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 gap-2">
                  <span>
                    Shipping to: {order.shippingAddress.name}, {order.shippingAddress.city}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="hover:text-neutral-900 underline">Download Invoice</button>
                    <span>•</span>
                    <button className="hover:text-neutral-900 underline">Need Assistance?</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
