import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, AlertCircle, ShoppingBag, MapPin, Calendar, Clock, ChevronDown } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { ROUTE_CHECKPOINTS, RouteCheckpoint, CUSTOMER_LOCATION } from '../data/deliveryRoute';
import { LiveMap } from '../components/tracking/LiveMap';
import { TrackingTimeline } from '../components/tracking/TrackingTimeline';
import { EtaCard } from '../components/tracking/EtaCard';
import { DeliveryPartnerCard } from '../components/tracking/DeliveryPartnerCard';
import { DemoControls } from '../components/tracking/DemoControls';
import { DeliveredBanner } from '../components/tracking/DeliveredBanner';

export const TrackOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus, orders } = useOrders();

  const targetId = id || 'MALL10245';
  const order = getOrderById(targetId) || orders[0];

  // Simulation State: Start at checkpoint index 0 (18 MIN, 2.4 km away)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Can be toggled or auto-played
  const [simSpeed, setSimSpeed] = useState(1); // 1x, 2x, 3x
  const [showOrderModal, setShowOrderModal] = useState(false);

  const currentCheckpoint: RouteCheckpoint = ROUTE_CHECKPOINTS[currentIndex] || ROUTE_CHECKPOINTS[0];
  const isDelivered = currentIndex >= ROUTE_CHECKPOINTS.length - 1;

  // Auto-Simulation Timer when isPlaying is true
  useEffect(() => {
    if (!isPlaying || isDelivered) return;

    // Time per step in ms based on speed multiplier
    const stepDuration = Math.round(3500 / simSpeed);

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < ROUTE_CHECKPOINTS.length - 1) {
          const next = prev + 1;
          // If reaching last index, update order status in context to Delivered
          if (next === ROUTE_CHECKPOINTS.length - 1) {
            updateOrderStatus(targetId, 'Delivered', 4, '9:42 PM');
          }
          return next;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isPlaying, isDelivered, simSpeed, targetId, updateOrderStatus]);

  // Handler for Demo Controls manual milestone jump
  const handleSelectCheckpoint = (index: number) => {
    setCurrentIndex(index);
    if (index >= ROUTE_CHECKPOINTS.length - 1) {
      updateOrderStatus(targetId, 'Delivered', 4, '9:42 PM');
    } else {
      updateOrderStatus(targetId, 'Out for Delivery', 3);
    }
  };

  const handleResetSimulation = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    updateOrderStatus(targetId, 'Out for Delivery', 3);
  };

  const currentTimelineIndex = isDelivered ? 4 : currentCheckpoint.timelineIndex;

  return (
    <div className="min-h-screen bg-neutral-50/40 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white border border-neutral-200 rounded-sm p-4 sm:p-6 shadow-subtle flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              to="/orders"
              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors"
              title="Back to My Orders"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Real-Time Hyperlocal Tracker
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-0.5">
                TRACK YOUR ORDER
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Tracking Reference
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-neutral-950">
                #{order ? order.id : targetId}
              </span>
            </div>

            <button
              onClick={() => setShowOrderModal(true)}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 rounded text-xs font-bold uppercase tracking-wider text-neutral-800 transition-colors"
            >
              Order Items
            </button>
          </div>
        </div>

        {/* PRESENTER DEMO CONTROLLER (Sleek collapsible presentation toolbar) */}
        <DemoControls
          currentIndex={currentIndex}
          onSelectIndex={handleSelectCheckpoint}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          speed={simSpeed}
          onChangeSpeed={setSimSpeed}
          onReset={handleResetSimulation}
        />

        {/* 1. ORDER TRACKING TIMELINE */}
        <TrackingTimeline
          currentStageIndex={currentTimelineIndex}
          deliveredAtTime={order?.deliveredAt || '9:42 PM'}
        />

        {/* 2. MAIN TRACKING SECTION: Map on Left (Col 8) + ETA / Partner Info on Right (Col 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Large Professional Map (Col 7 / 8) */}
          <div className="lg:col-span-8 space-y-4">
            <LiveMap
              currentCheckpoint={currentCheckpoint}
              checkpointIndex={currentIndex}
              isDelivered={isDelivered}
            />

            {/* Customer Delivery Address Strip below Map */}
            <div className="bg-white border border-neutral-200 rounded-sm p-4 text-xs text-neutral-700 flex items-start space-x-3 shadow-subtle">
              <div className="p-2 bg-neutral-100 rounded text-neutral-800 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Delivery Destination
                </span>
                <p className="font-bold text-neutral-900 mt-0.5">
                  {order?.shippingAddress?.name || 'Aditya Sharma'} •{' '}
                  {order?.shippingAddress?.houseFlat || 'Flat 402, Tower B'}, {order?.shippingAddress?.street || 'Prestige Elmwood, 12th Main Road, Indiranagar'}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Landmark: {CUSTOMER_LOCATION.landmark}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: ETA Card + Delivery Partner Card / Delivered Celebration (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            {isDelivered ? (
              <DeliveredBanner
                orderId={order ? order.id : targetId}
                deliveredTime="9:42 PM"
                onViewOrder={() => setShowOrderModal(true)}
              />
            ) : (
              <EtaCard
                checkpoint={currentCheckpoint}
                isDelivered={isDelivered}
                orderId={order ? order.id : targetId}
              />
            )}

            {/* Delivery Partner Card */}
            <DeliveryPartnerCard isDelivered={isDelivered} />
          </div>
        </div>
      </div>

      {/* Order Items Modal */}
      {showOrderModal && order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full rounded-md shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900">
            <div className="flex items-center justify-between p-4 border-b border-neutral-100 bg-neutral-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Order Summary • #{order.id}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-neutral-400 hover:text-neutral-900 text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3 divide-y divide-neutral-100 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover object-top rounded border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase">
                      {item.brand}
                    </span>
                    <p className="font-semibold text-neutral-900 truncate">{item.productName}</p>
                    <p className="text-[11px] text-neutral-500">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-neutral-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs font-bold">
              <span>Total Paid ({order.paymentMethod})</span>
              <span className="font-mono text-sm">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
