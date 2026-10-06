import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, MapPin, Calendar, Clock, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrderById, orders } = useOrders();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId') || 'MALL10245';

  const order = getOrderById(orderId) || orders[0];

  useEffect(() => {
    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white border border-neutral-200 rounded-sm p-6 sm:p-10 shadow-subtle text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
          Order Confirmed & Picked
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 mt-1">
          ORDER PLACED SUCCESSFULLY
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
          Order ID: <strong className="text-neutral-900 font-mono">#{order ? order.id : orderId}</strong>
        </p>

        {/* Live Tracking Banner Callout */}
        <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-left flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Live Delivery Tracking Active
              </p>
              <p className="text-[11px] text-emerald-800">
                Delivery partner Rahul Kumar is en route with your package.
              </p>
            </div>
          </div>
          <Link
            to={`/track-order/${order ? order.id : orderId}`}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            Track Map
          </Link>
        </div>

        {/* Order Details Summary Box */}
        {order && (
          <div className="border border-neutral-200 rounded-sm p-4 sm:p-5 text-left text-xs space-y-4 mb-6 bg-neutral-50/50">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center space-x-2 text-neutral-700">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>
                  Expected Delivery: <strong className="text-neutral-900">{order.expectedDeliveryDate}</strong>
                </span>
              </div>
              <span className="font-bold text-neutral-900 font-mono text-sm">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Shipping Address */}
            <div className="flex items-start space-x-2 text-neutral-600">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900">
                  {order.shippingAddress.name} ({order.shippingAddress.addressType})
                </p>
                <p>
                  {order.shippingAddress.houseFlat}, {order.shippingAddress.street},{' '}
                  {order.shippingAddress.city} - {order.shippingAddress.pinCode}
                </p>
                <p className="text-[11px] text-neutral-500">Contact: {order.shippingAddress.mobile}</p>
              </div>
            </div>

            {/* Items Thumbnails */}
            <div className="pt-2 border-t border-neutral-200">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Items In This Order
              </p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-12 object-cover object-top rounded border border-neutral-200"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900 truncate max-w-xs">{item.productName}</p>
                        <p className="text-[11px] text-neutral-500">
                          {item.brand} • Size {item.size} • Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-neutral-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons: TRACK ORDER & CONTINUE SHOPPING */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={`/track-order/${order ? order.id : orderId}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all shadow-md inline-flex items-center justify-center space-x-2"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Track Order on Live Map</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-none transition-colors inline-flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
